import { jsPDF } from "jspdf";

const PAGE = {
  marginX: 16,
  marginTop: 18,
  marginBottom: 14
};

const safeValue = (value, fallback = "") => (typeof value === "string" && value.trim() ? value.trim() : fallback);
const joinCompact = (items) => items.filter(Boolean).join(" | ");
const safeFileName = (value) =>
  (value || "devfolio-resume")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const splitBulletPoints = (text, fallback) => {
  const items = safeValue(text)
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length ? items : [fallback];
};

const createRenderer = (scale = 1) => {
  const pdf = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a4"
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PAGE.marginX * 2;
  const rightX = pageWidth - PAGE.marginX;
  let y = PAGE.marginTop;

  const lh = (fontSize, multiplier = 1.5) => fontSize * multiplier;
  const setFont = (style, size, color = [20, 20, 20]) => {
    pdf.setFont("helvetica", style);
    pdf.setFontSize(size * scale);
    pdf.setTextColor(...color);
  };

  const fitsSinglePage = () => y <= pageHeight - PAGE.marginBottom;

  const addWrappedText = (text, { style = "normal", size = 9.2, color = [40, 40, 40], gap = 5, indent = 0 } = {}) => {
    const value = safeValue(text);

    if (!value) {
      return;
    }

    setFont(style, size, color);
    const lines = pdf.splitTextToSize(value, contentWidth - indent);
    pdf.text(lines, PAGE.marginX + indent, y);
    y += lines.length * lh(size * scale) + gap * scale;
  };

  const addBulletList = (items, size = 9.1) => {
    items.filter(Boolean).forEach((item) => {
      setFont("normal", size, [35, 35, 35]);
      const lines = pdf.splitTextToSize(item, contentWidth - 18);
      pdf.text("•", PAGE.marginX + 14, y);
      pdf.text(lines, PAGE.marginX + 28, y);
      y += lines.length * lh(size * scale) + 1.5 * scale;
    });
  };

  const addSectionHeading = (title) => {
    y += 3 * scale;
    setFont("bold", 10.2, [18, 18, 18]);
    pdf.text(title.toUpperCase(), PAGE.marginX, y);
    y += 9 * scale;
  };

  return {
    pdf,
    pageHeight,
    contentWidth,
    rightX,
    getY: () => y,
    setFont,
    addWrappedText,
    addBulletList,
    addSectionHeading,
    advance: (amount) => {
      y += amount * scale;
    },
    text: (value, x, options) => {
      pdf.text(value, x, y, options);
    },
    splitTextToSize: (value, width) => pdf.splitTextToSize(value, width),
    lineHeight: lh,
    fitsSinglePage
  };
};

const renderResume = ({ user, portfolio, scale }) => {
  const r = createRenderer(scale);
  const title = safeValue(portfolio.title, "Web Developer");
  const titleWords = title.split(/\s+/);
  const firstWord = titleWords.slice(0, 1).join(" ");
  const restWords = titleWords.slice(1).join(" ");

  r.setFont("bold", 19, [10, 10, 10]);
  r.text(safeValue(user?.name, "YOUR NAME").toUpperCase(), PAGE.marginX);
  r.setFont("bold", 13.5, [20, 20, 20]);
  r.text(firstWord || "Web", r.rightX, { align: "right" });
  r.advance(11);
  r.text(restWords || "Developer", r.rightX, { align: "right" });
  r.advance(9);

  const contactLine = joinCompact([
    safeValue(portfolio.contact?.phone),
    portfolio.contact?.email || user?.email || "",
    safeValue(portfolio.contact?.address)
  ]);
  r.addWrappedText(contactLine, { size: 9, gap: 5 });

  r.addSectionHeading("Career Summary");
  r.addWrappedText(portfolio.bio, { size: 9.2, gap: 5 });

  r.addSectionHeading("Technical Skills");
  r.addWrappedText(Array.isArray(portfolio.skills) ? portfolio.skills.filter(Boolean).join(" | ") : "", {
    size: 9.2,
    gap: 5
  });

  r.addSectionHeading("Professional Experience");
  const experienceItems = Array.isArray(portfolio.experience)
    ? portfolio.experience.filter((item) => item.company || item.role || item.location || item.summary || item.duration)
    : [];

  if (!experienceItems.length) {
    r.addWrappedText("Add your work experience in the builder to show it here.", { size: 9, gap: 6 });
  } else {
    experienceItems.forEach((item) => {
      r.setFont("bold", 9.8, [15, 15, 15]);
      const heading = [safeValue(item.role), safeValue(item.company), safeValue(item.location)]
        .filter(Boolean)
        .join(" | ");
      r.text(heading || "Role | Company", PAGE.marginX);
      r.text(safeValue(item.duration, "Duration"), r.rightX, { align: "right" });
      r.advance(7);
      r.addBulletList(
        splitBulletPoints(item.summary, "Describe your responsibilities and impact in this role."),
        8.95
      );
      r.advance(2);
    });
  }

  r.addSectionHeading("Projects");
  const projectItems = Array.isArray(portfolio.projects)
    ? portfolio.projects.filter((item) => item.title || item.description || item.link)
    : [];

  if (!projectItems.length) {
    r.addWrappedText("Add portfolio projects in the builder to show them here.", { size: 9, gap: 6 });
  } else {
    projectItems.forEach((project) => {
      r.setFont("bold", 9.8, [15, 15, 15]);
      r.text(safeValue(project.title, "Project"), PAGE.marginX);
      r.advance(7);

      if (safeValue(project.link)) {
        r.addWrappedText(project.link, { size: 8.6, color: [0, 102, 153], gap: 2 });
      }

      r.addBulletList(
        splitBulletPoints(project.description, "Add project outcomes, stack, and implementation details."),
        8.95
      );
      r.advance(2);
    });
  }

  r.addSectionHeading("Education");
  const educationItems = Array.isArray(portfolio.education)
    ? portfolio.education.filter((item) => item.institution || item.degree || item.duration || item.location)
    : [];

  if (!educationItems.length) {
    r.addWrappedText("Add your education in the builder to show it here.", { size: 9, gap: 6 });
  } else {
    educationItems.forEach((item) => {
      r.setFont("bold", 9.5, [15, 15, 15]);
      const educationLine = [safeValue(item.degree), safeValue(item.institution), safeValue(item.location)]
        .filter(Boolean)
        .join(" | ");
      const lines = r.splitTextToSize(educationLine || "Degree | Institution", r.contentWidth - 84);
      r.pdf.text(lines, PAGE.marginX, r.getY());
      r.pdf.text(safeValue(item.duration, "Duration"), r.rightX, r.getY(), { align: "right" });
      r.advance(lines.length * r.lineHeight(9.5 * scale) / (scale || 1) + 3);
    });
  }

  return { pdf: r.pdf, fits: r.fitsSinglePage() };
};

export const generateResumePdf = ({ user, portfolio }) => {
  const scales = [1.14, 1.1, 1.06, 1.02, 1, 0.97, 0.94, 0.91, 0.88, 0.85];

  for (const scale of scales) {
    const result = renderResume({ user, portfolio, scale });

    if (result.fits) {
      return {
        pdf: result.pdf,
        fileName: `${safeFileName(user?.name)}.pdf`
      };
    }
  }

  const fallback = renderResume({ user, portfolio, scale: 0.8 });
  return {
    pdf: fallback.pdf,
    fileName: `${safeFileName(user?.name)}.pdf`
  };
};

export const downloadResumePdf = (payload) => {
  const { pdf, fileName } = generateResumePdf(payload);
  pdf.save(fileName);
  return fileName;
};
