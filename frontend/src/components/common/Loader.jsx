const Loader = ({ label = "Loading..." }) => (
  <div className="flex min-h-[120px] items-center justify-center rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 text-sm text-slate-300">
    <div className="flex items-center gap-3">
      <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
      <span>{label}</span>
    </div>
  </div>
);

export default Loader;

