FROM node:24-alpine@sha256:50c8e8ca1d27439048670df5883f32d57cf81cff6233222c893fd0d9884cbd81 AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@12.3.4 --activate
FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY next.config.ts next-env.d.ts tsconfig.json ./
RUN pnpm build
FROM base AS production-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile
FROM node:24-alpine@sha256:50c8e8ca1d27439048670df5883f32d57cf81cff6233222c893fd0d9884cbd81 AS runtime
WORKDIR /app
# Runtime has no package installation duties. Remove unused tooling and pin fixed SSL libraries.
RUN apk add --no-cache libcrypto3=3.5.8-r0 libssl3=3.5.8-r0 \
    && rm -rf /usr/local/lib/node_modules/npm /opt/yarn-* \
    && rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/yarn /usr/local/bin/yarnpkg
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=production-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --chown=node:node next.runtime.config.mjs ./next.config.mjs
USER node
EXPOSE 4180
HEALTHCHECK --interval=15s --timeout=3s --start-period=15s CMD node -e "fetch('http://127.0.0.1:4180').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "node_modules/next/dist/bin/next", "start", "--hostname", "0.0.0.0", "--port", "4180"]
