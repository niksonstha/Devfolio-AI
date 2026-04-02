import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true,
      default: ""
    },
    summary: {
      type: String,
      trim: true,
      default: ""
    },
    duration: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      trim: true,
      default: ""
    },
    degree: {
      type: String,
      trim: true,
      default: ""
    },
    duration: {
      type: String,
      trim: true,
      default: ""
    },
    location: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      default: ""
    },
    phone: {
      type: String,
      trim: true,
      default: ""
    },
    address: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { _id: false }
);

const socialLinksSchema = new mongoose.Schema(
  {
    website: {
      type: String,
      trim: true,
      default: ""
    },
    github: {
      type: String,
      trim: true,
      default: ""
    },
    linkedin: {
      type: String,
      trim: true,
      default: ""
    },
    twitter: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    bio: {
      type: String,
      required: true,
      trim: true
    },
    contact: contactSchema,
    socialLinks: socialLinksSchema,
    skills: [
      {
        type: String,
        trim: true
      }
    ],
    projects: [projectSchema],
    experience: [experienceSchema],
    education: [educationSchema]
  },
  {
    timestamps: true
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
