"use client";
import { useRef, useState } from "react";
import { visibilityFor, type Role } from "@/lib/visibility";
const roles: readonly Role[] = ["client", "agency", "contractor", "public"];
const descriptions: Record<Role, string> = {
  client: "Confidence in the project. Without a view into everyone’s pay.",
  agency:
    "Coordinate the engagement. Keep commercial terms between the right people.",
  contractor: "Your work. Your agreed share. Your own receipt.",
  public:
    "Confidential does not mean invisible. Some activity remains observable.",
};
export function VisibilityExplorer() {
  const [role, setRole] = useState<Role>("client");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const policy = visibilityFor(role);
  return (
    <div className="visibility-explorer">
      <div
        className="role-tabs"
        role="tablist"
        aria-label="View as a participant"
      >
        {roles.map((item, index) => (
          <button
            key={item}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${item}`}
            aria-selected={item === role}
            aria-controls="visibility-panel"
            tabIndex={item === role ? 0 : -1}
            onClick={() => setRole(item)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % roles.length;
              else if (event.key === "ArrowLeft")
                next = (index - 1 + roles.length) % roles.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = roles.length - 1;
              else return;
              event.preventDefault();
              setRole(roles[next]);
              tabs.current[next]?.focus();
            }}
          >
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="visibility-panel"
        aria-labelledby={`tab-${role}`}
        tabIndex={0}
      >
        <p className="role-description">{descriptions[role]}</p>
        <div className="visibility-columns">
          <div>
            <h3>Visible to you</h3>
            <ul>
              {policy.visible.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">↗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden-column">
            <h3>Not shared with you</h3>
            <ul>
              {policy.hidden.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="privacy-caveat">
        Intended access model, pending technical verification. Public metadata
        can still reveal relationships.{" "}
        <a href="/privacy">Read the boundaries ↗</a>
      </p>
    </div>
  );
}
