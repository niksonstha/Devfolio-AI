const AuthForm = ({
  fields,
  formData,
  title,
  subtitle,
  submitLabel,
  onChange,
  onSubmit,
  loading,
  error,
  footer
}) => (
  <div className="glass-card w-full max-w-md rounded-[2rem] p-8 text-slate-100">
    <div className="mb-8">
      <p className="mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
        DevFolio AI
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-slate-300">{subtitle}</p>
    </div>

    <form className="space-y-4" onSubmit={onSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
          <input
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            placeholder={field.placeholder}
            onChange={onChange}
            required
          />
        </label>
      ))}

      {error ? (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <button
        className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-300 px-4 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Please wait..." : submitLabel}
      </button>
    </form>

    <div className="mt-6 text-sm text-slate-300">{footer}</div>
  </div>
);

export default AuthForm;

