const polishSentence = (value) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const normalized = trimmed.replace(/\s+/g, " ");
  const capped = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  if (capped.length < 80) {
    return `${capped} with a clear focus on outcomes, collaboration, and maintainable delivery.`;
  }

  if (!/[.!?]$/.test(capped)) {
    return `${capped}.`;
  }

  return capped;
};

export const improvePortfolioText = ({ text, context }) => {
  const refined = polishSentence(text);

  if (!refined) {
    return "";
  }

  if (context === "bio") {
    return `${refined} I enjoy turning ambiguous product ideas into polished developer experiences that feel fast, useful, and trustworthy.`;
  }

  if (context === "project") {
    return `${refined} It highlights the problem, the stack, and the measurable value delivered to users or stakeholders.`;
  }

  return `${refined} The wording is tighter, more confident, and easier for recruiters or clients to scan.`;
};
