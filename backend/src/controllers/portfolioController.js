import Portfolio from "../models/Portfolio.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createDefaultPortfolio } from "../utils/portfolioDefaults.js";

const sanitizePortfolioPayload = (body) => ({
  title: body.title?.trim() || "Full-Stack Developer",
  bio: body.bio?.trim() || "Tell your story here.",
  contact: {
    email: body.contact?.email?.trim() || "",
    phone: body.contact?.phone?.trim() || "",
    address: body.contact?.address?.trim() || ""
  },
  socialLinks: {
    website: body.socialLinks?.website?.trim() || "",
    github: body.socialLinks?.github?.trim() || "",
    linkedin: body.socialLinks?.linkedin?.trim() || "",
    twitter: body.socialLinks?.twitter?.trim() || ""
  },
  skills: Array.isArray(body.skills)
    ? body.skills.map((skill) => skill.trim()).filter(Boolean)
    : [],
  projects: Array.isArray(body.projects)
    ? body.projects
        .map((project) => ({
          title: project.title?.trim() || "",
          description: project.description?.trim() || "",
          link: project.link?.trim() || ""
        }))
        .filter((project) => project.title || project.description || project.link)
    : [],
  experience: Array.isArray(body.experience)
    ? body.experience
        .map((item) => ({
          company: item.company?.trim() || "",
          role: item.role?.trim() || "",
          location: item.location?.trim() || "",
          summary: item.summary?.trim() || "",
          duration: item.duration?.trim() || ""
        }))
        .filter((item) => item.company || item.role || item.location || item.summary || item.duration)
    : [],
  education: Array.isArray(body.education)
    ? body.education
        .map((item) => ({
          institution: item.institution?.trim() || "",
          degree: item.degree?.trim() || "",
          duration: item.duration?.trim() || "",
          location: item.location?.trim() || ""
        }))
        .filter((item) => item.institution || item.degree || item.duration || item.location)
    : []
});

export const getPortfolio = asyncHandler(async (req, res) => {
  let portfolio = await Portfolio.findOne({ user: req.user._id });

  if (!portfolio) {
    portfolio = await Portfolio.create({
      user: req.user._id,
      ...createDefaultPortfolio()
    });
  }

  res.json(portfolio);
});

export const savePortfolio = asyncHandler(async (req, res) => {
  const payload = sanitizePortfolioPayload(req.body);

  const portfolio = await Portfolio.findOneAndUpdate(
    { user: req.user._id },
    {
      user: req.user._id,
      ...createDefaultPortfolio(payload),
      ...payload
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    }
  );

  res.json(portfolio);
});
