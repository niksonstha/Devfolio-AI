const emptyProject = { title: "", description: "", link: "" };
const emptyExperience = { company: "", role: "", location: "", summary: "", duration: "" };
const emptyEducation = { institution: "", degree: "", duration: "", location: "" };

const fieldClassName =
  "w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

const SectionCard = ({ title, description, children, action }) => (
  <section className="glass-card rounded-[2rem] p-6">
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      {action}
    </div>
    {children}
  </section>
);

const BuilderForm = ({
  portfolio,
  onFieldChange,
  onObjectFieldChange,
  onListChange,
  onListAdd,
  onListRemove
}) => (
  <div className="space-y-6">
    <SectionCard
      title="Profile"
      description="Shape the headline and bio that anchor the rest of your story."
    >
      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Portfolio title</span>
          <input
            className={fieldClassName}
            name="title"
            value={portfolio.title}
            onChange={onFieldChange}
            placeholder="Senior Full-Stack Engineer"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Bio</span>
          <textarea
            className={`${fieldClassName} min-h-36 resize-y`}
            name="bio"
            value={portfolio.bio}
            onChange={onFieldChange}
            placeholder="Tell visitors what you build and why it matters."
          />
        </label>
      </div>
    </SectionCard>

    <SectionCard
      title="Contact"
      description="Add the details you want recruiters and clients to use when reaching out."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
          <input
            className={fieldClassName}
            type="email"
            value={portfolio.contact.email}
            onChange={(event) => onObjectFieldChange("contact", "email", event.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Phone</span>
          <input
            className={fieldClassName}
            value={portfolio.contact.phone}
            onChange={(event) => onObjectFieldChange("contact", "phone", event.target.value)}
            placeholder="+44 7700 900123"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-200">Address</span>
          <input
            className={fieldClassName}
            value={portfolio.contact.address}
            onChange={(event) => onObjectFieldChange("contact", "address", event.target.value)}
            placeholder="London, United Kingdom"
          />
        </label>
      </div>
    </SectionCard>

    <SectionCard
      title="Social Links"
      description="Include the profiles and portfolio links you want shown in your resume."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Website</span>
          <input
            className={fieldClassName}
            value={portfolio.socialLinks.website}
            onChange={(event) => onObjectFieldChange("socialLinks", "website", event.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">GitHub</span>
          <input
            className={fieldClassName}
            value={portfolio.socialLinks.github}
            onChange={(event) => onObjectFieldChange("socialLinks", "github", event.target.value)}
            placeholder="https://github.com/your-handle"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">LinkedIn</span>
          <input
            className={fieldClassName}
            value={portfolio.socialLinks.linkedin}
            onChange={(event) => onObjectFieldChange("socialLinks", "linkedin", event.target.value)}
            placeholder="https://linkedin.com/in/your-handle"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Twitter / X</span>
          <input
            className={fieldClassName}
            value={portfolio.socialLinks.twitter}
            onChange={(event) => onObjectFieldChange("socialLinks", "twitter", event.target.value)}
            placeholder="https://x.com/your-handle"
          />
        </label>
      </div>
    </SectionCard>

    <SectionCard
      title="Skills"
      description="Keep each skill concise so the preview reads clearly."
      action={
        <button
          className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          onClick={() => onListAdd("skills", "")}
          type="button"
        >
          Add skill
        </button>
      }
    >
      <div className="space-y-3">
        {portfolio.skills.map((skill, index) => (
          <div key={`skill-${index}`} className="flex gap-3">
            <input
              className={fieldClassName}
              value={skill}
              onChange={(event) => onListChange("skills", index, event.target.value)}
              placeholder="React"
            />
            <button
              className="rounded-2xl border border-slate-700 px-4 text-sm text-slate-300 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-100"
              onClick={() => onListRemove("skills", index)}
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard
      title="Projects"
      description="Add featured work with enough context for recruiters to understand the outcome."
      action={
        <button
          className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          onClick={() => onListAdd("projects", emptyProject)}
          type="button"
        >
          Add project
        </button>
      }
    >
      <div className="space-y-4">
        {portfolio.projects.map((project, index) => (
          <div key={`project-${index}`} className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-4">
            <div className="mb-4 flex justify-end">
              <button
                className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-100"
                onClick={() => onListRemove("projects", index)}
                type="button"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4">
              <input
                className={fieldClassName}
                value={project.title}
                onChange={(event) => onListChange("projects", index, event.target.value, "title")}
                placeholder="Project title"
              />
              <textarea
                className={`${fieldClassName} min-h-28 resize-y`}
                value={project.description}
                onChange={(event) =>
                  onListChange("projects", index, event.target.value, "description")
                }
                placeholder="Describe the challenge, implementation, and impact."
              />
              <input
                className={fieldClassName}
                value={project.link}
                onChange={(event) => onListChange("projects", index, event.target.value, "link")}
                placeholder="https://example.com"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard
      title="Experience"
      description="Show career progression with clear company, role, and duration details."
      action={
        <button
          className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          onClick={() => onListAdd("experience", emptyExperience)}
          type="button"
        >
          Add experience
        </button>
      }
    >
      <div className="space-y-4">
        {portfolio.experience.map((item, index) => (
          <div key={`experience-${index}`} className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-4">
            <div className="mb-4 flex justify-end">
              <button
                className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-100"
                onClick={() => onListRemove("experience", index)}
                type="button"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={fieldClassName}
                value={item.company}
                onChange={(event) => onListChange("experience", index, event.target.value, "company")}
                placeholder="Company"
              />
              <input
                className={fieldClassName}
                value={item.role}
                onChange={(event) => onListChange("experience", index, event.target.value, "role")}
                placeholder="Role"
              />
              <input
                className={fieldClassName}
                value={item.location}
                onChange={(event) => onListChange("experience", index, event.target.value, "location")}
                placeholder="Location"
              />
              <input
                className={fieldClassName}
                value={item.duration}
                onChange={(event) => onListChange("experience", index, event.target.value, "duration")}
                placeholder="2023 - Present"
              />
              <textarea
                className={`${fieldClassName} min-h-28 resize-y sm:col-span-2`}
                value={item.summary}
                onChange={(event) => onListChange("experience", index, event.target.value, "summary")}
                placeholder="Describe responsibilities, stack, and impact. Each sentence will become a resume bullet."
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard
      title="Education"
      description="Add the degree or academic background you want shown on the resume."
      action={
        <button
          className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          onClick={() => onListAdd("education", emptyEducation)}
          type="button"
        >
          Add education
        </button>
      }
    >
      <div className="space-y-4">
        {portfolio.education.map((item, index) => (
          <div key={`education-${index}`} className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-4">
            <div className="mb-4 flex justify-end">
              <button
                className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-100"
                onClick={() => onListRemove("education", index)}
                type="button"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={fieldClassName}
                value={item.institution}
                onChange={(event) => onListChange("education", index, event.target.value, "institution")}
                placeholder="University or college"
              />
              <input
                className={fieldClassName}
                value={item.degree}
                onChange={(event) => onListChange("education", index, event.target.value, "degree")}
                placeholder="Degree"
              />
              <input
                className={fieldClassName}
                value={item.duration}
                onChange={(event) => onListChange("education", index, event.target.value, "duration")}
                placeholder="2019 - 2024"
              />
              <input
                className={fieldClassName}
                value={item.location}
                onChange={(event) => onListChange("education", index, event.target.value, "location")}
                placeholder="London, UK"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  </div>
);

export default BuilderForm;
