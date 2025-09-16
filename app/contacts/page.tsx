"use client";

import { useEffect, useState } from "react";
import type { Contact } from "../../lib/types";

type ApiResponse = {
  items: Contact[];
  total: number;
};

async function fetchContacts(query: string): Promise<ApiResponse> {
  const u = new URL("/api/contacts", window.location.origin);
  if (query.trim()) u.searchParams.set("q", query.trim());
  const res = await fetch(u.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json();
}

export default function ContactsPage() {
  // TODO: wires search input to fetch results with debounce.
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load to show all contacts.
  useEffect(() => {
    let disposed = false;
    setLoading(true);
    setError(null);
    fetchContacts("")
      .then((data) => {
        if (disposed) return;
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (disposed) return;
        setError(err.message || "Failed to load contacts");
      })
      .finally(() => {
        if (disposed) return;
        setLoading(false);
      });
    return () => {
      disposed = true;
    };
  }, []);

  // TODO:
  // - Trigger fetchContacts(query) when `query` changes.
  // - Debounce by ~300ms (setTimeout/clearTimeout).
  // - Set loading/error accordingly.
  // - Stretch: keep `q` in the URL so it can be shared/refreshed.

  return (
    <main>
      <h1 style={{ marginTop: 0 }}>Contacts</h1>

      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <input
          aria-label="Search contacts"
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            minWidth: 260
          }}
        />
        <span style={{ color: "#666", alignSelf: "center" }}>
          Total: {total}
        </span>
      </div>

      {loading && <div>Loading contacts…</div>}
      {error && (
        <div style={{ color: "crimson" }}>
          Error: {error}
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <div>No contacts found</div>
      )}

      {!loading && !error && items.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderTop: "1px solid #eee"
          }}
        >
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Company</th>
              <th style={th}>Phone</th>
              <th style={th}>Last modified</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td style={td}>{c.name}</td>
                <td style={td}>{c.email}</td>
                <td style={td}>{c.company}</td>
                <td style={td}>{c.phone || "—"}</td>
                <td style={td}>
                  {new Date(c.lastModified).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 16, color: "#666" }}>
        Exercise: Add debounced server-side search.
        <ul>
          <li>Type in the box to filter by name or email (server-side via /api/contacts?q=…)</li>
          <li>Debounce ~300ms</li>
          <li>Show loading, empty, and error states</li>
          <li>Stretch: keep q in the URL</li>
        </ul>
      </div>
    </main>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "8px 6px",
  borderBottom: "1px solid #eee",
  fontWeight: 600
};

const td: React.CSSProperties = {
  padding: "8px 6px",
  borderBottom: "1px solid #f3f3f3"
};