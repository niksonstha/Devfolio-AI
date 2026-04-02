const sectionTitleClass =
  "text-[11px] font-bold uppercase tracking-[0.38em] text-slate-400";

const InlineList = ({ items, className = "" }) => {
  const filtered = items.filter(Boolean);

  if (!filtered.length) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-x-2 gap-y-1 text-[13px] leading-6 text-slate-300 ${className}`}>
      {filtered.map((item, index) => (
        <span key={`${item}-${index}`}>
          {index > 0 ? <span className="mr-2 text-slate-500">|</span> : null}
          {item}
        </span>
      ))}
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="border-t border-slate-800/90 pt-4">
    <h3 className={sectionTitleClass}>{title}</h3>
    <div className="mt-3">{children}</div>
  </section>
);

const bulletLines = (text, fallback) =>
  (text ? text.split(/(?<=[.!?])\s+/).filter(Boolean) : []).length
    ? text.split(/(?<=[.!?])\s+/).filter(Boolean)
    : [fallback];

const PreviewPanel = ({ portfolio, user }) => {
  const contactItems = [
    portfolio.contact?.phone || "",
    portfolio.contact?.email || user?.email || "",
    portfolio.contact?.address || ""
  ];

  return (
    <section id="preview" className="glass-card rounded-[2rem] p-5 lg:p-6">
      <div className="flex flex-col gap-4 border-b border-slate-800/90 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[1.75rem] font-extrabold uppercase tracking-[0.45em] text-white sm:text-[2rem]">
            {user?.name || "Your Name"}
          </p>
          <div className="mt-2">
            <InlineList items={contactItems} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/90 bg-slate-950/60 px-4 py-3 text-right">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">Role</p>
          <p className="mt-1 text-base font-semibold leading-6 text-white">
            {portfolio.title || "Web Developer"}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <Section title="Career Summary">
          <p className="text-[13px] leading-6 text-slate-200">{portfolio.bio}</p>
        </Section>

        <Section title="Technical Skills">
          <InlineList
            items={portfolio.skills.filter(Boolean)}
            className="font-medium text-slate-200"
          />
        </Section>

        <Section title="Professional Experience">
          <div className="space-y-5">
            {portfolio.experience
              .filter((item) => item.company || item.role || item.location || item.summary || item.duration)
              .map((item, index) => (
                <article key={`${item.company}-${index}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-white">
                        {item.role || "Role"} {item.company ? `| ${item.company}` : ""}{" "}
                        {item.location ? `| ${item.location}` : ""}
                      </h4>
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {item.duration || "Duration"}
                    </p>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-6 text-slate-200">
                    {bulletLines(item.summary, "Add a short summary of your work for this role.").map(
                      (line, lineIndex) => (
                        <li key={`${item.company}-${lineIndex}`} className="flex gap-3">
                          <span className="mt-[2px] text-cyan-300">•</span>
                          <span>{line}</span>
                        </li>
                      )
                    )}
                  </ul>
                </article>
              ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-5">
            {portfolio.projects
              .filter((project) => project.title || project.description || project.link)
              .map((project, index) => (
                <article key={`${project.title}-${index}`}>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[14px] font-bold text-white">
                      {project.title || "Untitled Project"}
                    </h4>
                    {project.link ? (
                      <a
                        className="text-[12px] text-cyan-300 hover:text-cyan-200"
                        href={project.link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {project.link}
                      </a>
                    ) : null}
                  </div>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-6 text-slate-200">
                    {bulletLines(
                      project.description,
                      "Add project outcomes, stack, and implementation details."
                    ).map((line, lineIndex) => (
                      <li key={`${project.title}-${lineIndex}`} className="flex gap-3">
                        <span className="mt-[2px] text-cyan-300">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-4">
            {portfolio.education
              .filter((item) => item.institution || item.degree || item.duration || item.location)
              .map((item, index) => (
                <article
                  key={`${item.institution}-${index}`}
                  className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <h4 className="text-[14px] font-bold uppercase text-white">
                      {item.degree || "Degree"} {item.institution ? `| ${item.institution}` : ""}{" "}
                      {item.location ? `| ${item.location}` : ""}
                    </h4>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {item.duration || "Duration"}
                  </p>
                </article>
              ))}
          </div>
        </Section>
      </div>
    </section>
  );
};

export default PreviewPanel;
