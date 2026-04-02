const AIAssistantPanel = ({
  targetOptions,
  selectedTarget,
  draftText,
  improvedText,
  loading,
  error,
  onTargetChange,
  onDraftTextChange,
  onImprove,
  onApply
}) => (
  <section id="assistant" className="glass-card rounded-[2rem] p-6">
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">AI Assistant</p>
      <h2 className="mt-3 text-2xl font-bold text-white">Improve portfolio copy</h2>
      <p className="mt-2 text-sm text-slate-400">
        Use the mock AI helper to tighten bios and project descriptions before saving.
      </p>
    </div>

    <div className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-200">Target field</span>
        <select
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
          value={selectedTarget}
          onChange={(event) => onTargetChange(event.target.value)}
        >
          {targetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-200">Text to improve</span>
        <textarea
          className="min-h-36 w-full resize-y rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
          value={draftText}
          onChange={(event) => onDraftTextChange(event.target.value)}
          placeholder="Paste or pull in a portfolio paragraph."
        />
      </label>

      <button
        className="rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading || !draftText.trim()}
        onClick={onImprove}
        type="button"
      >
        {loading ? "Improving..." : "Improve with AI"}
      </button>

      {error ? (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl border border-slate-800/80 bg-slate-950/50 p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Improved result</h3>
          <button
            className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-lime-300/40 hover:bg-lime-300/10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!improvedText}
            onClick={onApply}
            type="button"
          >
            Apply to portfolio
          </button>
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-200">
          {improvedText || "Your improved copy will appear here."}
        </p>
      </div>
    </div>
  </section>
);

export default AIAssistantPanel;

