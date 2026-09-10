"use client";
import { useEffect, useState, type FormEvent } from "react";
import { buildPilotBrief } from "@/lib/pilot";
export function PilotBrief() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  function download(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");
    const data = new FormData(event.currentTarget);
    try {
      const text = buildPilotBrief({
        agency: String(data.get("agency") ?? ""),
        email: String(data.get("email") ?? ""),
        challenge: String(data.get("challenge") ?? ""),
      });
      const url = URL.createObjectURL(
        new Blob([text], { type: "text/plain;charset=utf-8" }),
      );
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "scopeveil-pilot-brief.txt";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus(
        "Brief downloaded, not sent. Keep it for your pilot conversation.",
      );
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "The brief could not be created. Please check the fields.",
      );
    }
  }
  return (
    <form
      className="pilot-form"
      method="dialog"
      onSubmit={download}
      aria-label="Pilot brief"
      aria-describedby="pilot-help"
    >
      <div className="input-group">
        <label htmlFor="agency">Agency name</label>
        <input
          id="agency"
          name="agency"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={100}
          placeholder="Your agency"
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Work email</label>
        <input
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          required
          maxLength={254}
          placeholder="you@agency.com"
        />
      </div>
      <div className="input-group">
        <label htmlFor="challenge">What gets in the way of payment?</label>
        <textarea
          id="challenge"
          name="challenge"
          required
          minLength={10}
          maxLength={2000}
          rows={3}
          placeholder="Unfunded work, scope changes, private rates…"
          aria-describedby="pilot-help"
        />
      </div>
      <p id="pilot-help" className="form-help">
        Prepare a brief locally. Nothing is sent to us. Don’t include customer
        documents, private rates or wallet keys.
      </p>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="download-button" type="submit" disabled={!ready}>
        Download pilot brief <span aria-hidden="true">↓</span>
      </button>
      <p role="status" className="form-status">
        {status}
      </p>
      <noscript>
        <p>
          Enable JavaScript to generate a local brief. No data has been sent.
        </p>
      </noscript>
    </form>
  );
}
