import React, { useMemo, useState } from "react";
import { Download, LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import InteractivePanel from "../components/InteractivePanel";
import ScrollReveal from "../components/ScrollReveal";

function toCsv(rows) {
  const columns = ["timestamp", "name", "email", "ip", "country", "city", "userAgent", "referrer"];
  const escape = (value) => {
    const text = `${value ?? ""}`;
    return `"${text.replaceAll('"', '""')}"`;
  };

  return [columns.join(","), ...rows.map((row) => columns.map((column) => escape(row[column])).join(","))].join("\n");
}

export default function AdminDownloads() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [records, setRecords] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const total = records.length;
  const latest = useMemo(() => records[0] || null, [records]);

  const loadRecords = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/resume-downloads", {
        headers: { "x-admin-token": token },
      });

      if (!response.ok) {
        const fallback = await response.json().catch(() => null);
        throw new Error(fallback?.error || "Unable to load download logs.");
      }

      const data = await response.json();
      setRecords(data.records || []);
      setAuthenticated(true);
    } catch (error) {
      setError(error.message || "Something went wrong.");
      setRecords([]);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = () => {
    const csv = toCsv(records);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume-downloads.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="page-shell page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// private admin"
          title="Resume download tracking"
          subtitle="Enter your private token to view every CV download record. This page is not linked from the main navigation."
        />

        <ScrollReveal direction="up">
          <InteractivePanel className="glass-card spotlight-card rounded-[1.75rem] p-6 sm:p-8 mb-8" innerClassName="relative z-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-4 lg:items-end">
              <div className="space-y-3">
                <label className="block">
                  <span className="text-xs font-mono text-cyan-300 mb-2 inline-block">
                    Admin Token
                  </span>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <LockKeyhole size={15} className="text-cyan-300 shrink-0" />
                    <input
                      type="password"
                      value={token}
                      onChange={(event) => setToken(event.target.value)}
                      placeholder="Enter your private token"
                      className="w-full bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                  </div>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Logs are private and include timestamp, name, email, IP, browser,
                  and referrer data when available.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" className="btn-primary justify-center" onClick={loadRecords} disabled={loading}>
                  {loading ? "Loading..." : "Load logs"}
                  <RefreshCw size={15} />
                </button>
                <button type="button" className="btn-ghost justify-center" onClick={exportCsv} disabled={!records.length}>
                  Export CSV
                  <Download size={15} />
                </button>
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
            {authenticated && !error && (
              <p className="mt-4 text-sm text-emerald-400">
                <ShieldCheck size={14} className="inline-block mr-1 align-[-2px]" />
                Access granted.
              </p>
            )}
          </InteractivePanel>
        </ScrollReveal>

        <div className="grid gap-4 sm:gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InteractivePanel className="glass-card spotlight-card rounded-2xl p-5" innerClassName="relative z-10">
              <p className="text-xs font-mono text-cyan-300 mb-2">Total Downloads</p>
              <p className="font-display text-3xl text-slate-900 dark:text-white">{total}</p>
            </InteractivePanel>
            <InteractivePanel className="glass-card spotlight-card rounded-2xl p-5" innerClassName="relative z-10">
              <p className="text-xs font-mono text-cyan-300 mb-2">Latest Viewer</p>
              <p className="font-display text-lg text-slate-900 dark:text-white">{latest ? latest.name : "No logs yet"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{latest ? latest.email : "Waiting for the first download."}</p>
            </InteractivePanel>
            <InteractivePanel className="glass-card spotlight-card rounded-2xl p-5" innerClassName="relative z-10">
              <p className="text-xs font-mono text-cyan-300 mb-2">Status</p>
              <p className="font-display text-lg text-slate-900 dark:text-white">
                {authenticated ? "Private log open" : "Locked"}
              </p>
            </InteractivePanel>
          </div>

          <InteractivePanel className="glass-card spotlight-card rounded-[1.75rem] p-0 overflow-hidden" innerClassName="relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Time</th>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">IP</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Browser</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {records.length ? (
                    records.map((record) => (
                      <tr key={record.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">{record.timestamp}</td>
                        <td className="px-5 py-4 text-slate-900 dark:text-white font-medium">{record.name}</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{record.email}</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{record.ip || "n/a"}</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                          {[record.city, record.country].filter(Boolean).join(", ") || "n/a"}
                        </td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300 max-w-[14rem] truncate">
                          {record.userAgent || "n/a"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-5 py-16 text-center text-slate-500 dark:text-slate-400">
                        No records loaded yet. Enter your token and click Load logs.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </InteractivePanel>
        </div>
      </div>
    </main>
  );
}
