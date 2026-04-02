import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  [
    "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
    isActive
      ? "bg-cyan-400/15 text-cyan-200 shadow-lg shadow-cyan-950/30"
      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
  ].join(" ");

const Sidebar = ({ user, onDownloadPdf, onLogout, onSave, pdfState, saveState }) => (
  <aside className="glass-card soft-grid flex h-full flex-col rounded-[2rem] p-5">
    <Link to="/builder" className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">DevFolio AI</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white">Portfolio Studio</h1>
    </Link>

    <div className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Signed in</p>
      <p className="mt-2 text-lg font-semibold text-white">{user?.name || "Developer"}</p>
      <p className="text-sm text-slate-400">{user?.email}</p>
    </div>

    <nav className="mt-6 space-y-2">
      <NavLink className={navLinkClass} to="/builder">
        Builder
        <span className="font-mono text-xs text-slate-500">01</span>
      </NavLink>
      <a
        className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800/80 hover:text-white"
        href="#preview"
      >
        Preview
        <span className="font-mono text-xs text-slate-500">02</span>
      </a>
      <a
        className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800/80 hover:text-white"
        href="#assistant"
      >
        AI Assist
        <span className="font-mono text-xs text-slate-500">03</span>
      </a>
    </nav>

    <div className="mt-auto space-y-3">
      <button
        className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/15"
        onClick={onDownloadPdf}
        type="button"
      >
        {pdfState === "downloading" ? "Preparing PDF..." : "Download PDF"}
      </button>
      <button
        className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5"
        onClick={onSave}
        type="button"
      >
        {saveState === "saving" ? "Saving..." : "Save portfolio"}
      </button>
      <button
        className="w-full rounded-2xl border border-slate-700 px-4 py-3 font-semibold text-slate-200 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-100"
        onClick={onLogout}
        type="button"
      >
        Logout
      </button>
      <p className="text-xs text-slate-500">
        {pdfState === "done"
          ? "Your PDF download has been prepared."
          : saveState === "saved"
            ? "Latest edits saved to the backend."
            : "Live preview updates instantly while you edit."}
      </p>
    </div>
  </aside>
);

export default Sidebar;
