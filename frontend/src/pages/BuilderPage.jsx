import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios.js";
import AIAssistantPanel from "../components/builder/AIAssistantPanel.jsx";
import BuilderForm from "../components/builder/BuilderForm.jsx";
import PreviewPanel from "../components/builder/PreviewPanel.jsx";
import Loader from "../components/common/Loader.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { downloadResumePdf } from "../utils/generateResumePdf.js";

const defaultPortfolio = {
  title: "",
  bio: "",
  contact: {
    email: "",
    phone: "",
    address: ""
  },
  socialLinks: {
    website: "",
    github: "",
    linkedin: "",
    twitter: ""
  },
  skills: [""],
  projects: [{ title: "", description: "", link: "" }],
  experience: [{ company: "", role: "", location: "", summary: "", duration: "" }],
  education: [{ institution: "", degree: "", duration: "", location: "" }]
};

const getTargetOptions = (portfolio) => [
  { value: "bio", label: "Bio" },
  ...portfolio.projects.map((project, index) => ({
    value: `project:${index}`,
    label: `Project ${index + 1} description${project.title ? ` - ${project.title}` : ""}`
  }))
];

const mapPortfolioResponse = (data, fallbackEmail = "") => ({
  title: data.title || "",
  bio: data.bio || "",
  contact: {
    email: data.contact?.email || fallbackEmail || "",
    phone: data.contact?.phone || "",
    address: data.contact?.address || ""
  },
  socialLinks: {
    website: data.socialLinks?.website || "",
    github: data.socialLinks?.github || "",
    linkedin: data.socialLinks?.linkedin || "",
    twitter: data.socialLinks?.twitter || ""
  },
  skills: data.skills?.length ? data.skills : [""],
  projects: data.projects?.length ? data.projects : [{ title: "", description: "", link: "" }],
  experience: data.experience?.length
    ? data.experience
    : [{ company: "", role: "", location: "", summary: "", duration: "" }],
  education: data.education?.length
    ? data.education
    : [{ institution: "", degree: "", duration: "", location: "" }]
});

const BuilderPage = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [fetching, setFetching] = useState(true);
  const [saveState, setSaveState] = useState("idle");
  const [pdfState, setPdfState] = useState("idle");
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("bio");
  const [assistantDraft, setAssistantDraft] = useState("");

  const targetOptions = getTargetOptions(portfolio);

  useEffect(() => {
    const loadPortfolio = async () => {
      setFetching(true);
      setError("");

      try {
        const { data } = await api.get("/portfolio");
        setPortfolio(mapPortfolioResponse(data, auth.user?.email));
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate("/login", { replace: true });
          return;
        }

        setError(err.response?.data?.message || "Unable to load your portfolio");
      } finally {
        setFetching(false);
      }
    };

    loadPortfolio();
  }, [auth.user?.email, logout, navigate]);

  useEffect(() => {
    if (selectedTarget === "bio") {
      setAssistantDraft(portfolio.bio || "");
      return;
    }

    const [, rawIndex] = selectedTarget.split(":");
    const project = portfolio.projects[Number(rawIndex)];
    setAssistantDraft(project?.description || "");
  }, [portfolio.bio, portfolio.projects, selectedTarget]);

  useEffect(() => {
    if (!targetOptions.some((option) => option.value === selectedTarget)) {
      setSelectedTarget("bio");
    }
  }, [selectedTarget, targetOptions]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setPortfolio((current) => ({ ...current, [name]: value }));
    setSaveState("idle");
  };

  const handleObjectFieldChange = (section, key, value) => {
    setPortfolio((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: value
      }
    }));
    setSaveState("idle");
  };

  const handleListChange = (field, index, value, nestedKey) => {
    setPortfolio((current) => {
      const updated = [...current[field]];

      if (nestedKey) {
        updated[index] = { ...updated[index], [nestedKey]: value };
      } else {
        updated[index] = value;
      }

      return { ...current, [field]: updated };
    });
    setSaveState("idle");
  };

  const handleListAdd = (field, item) => {
    setPortfolio((current) => ({ ...current, [field]: [...current[field], item] }));
    setSaveState("idle");
  };

  const handleListRemove = (field, index) => {
    setPortfolio((current) => {
      const filtered = current[field].filter((_, itemIndex) => itemIndex !== index);
      return {
        ...current,
        [field]: filtered.length
          ? filtered
          : [typeof current[field][0] === "string" ? "" : { ...defaultPortfolio[field][0] }]
      };
    });
    setSaveState("idle");
  };

  const handleSave = async () => {
    setSaveState("saving");
    setError("");

    try {
      const { data } = await api.post("/portfolio", portfolio);
      setPortfolio(mapPortfolioResponse(data, auth.user?.email));
      setSaveState("saved");
    } catch (err) {
      setSaveState("idle");
      setError(err.response?.data?.message || "Unable to save your portfolio");
    }
  };

  const handleDownloadPdf = async () => {
    if (pdfState === "downloading") {
      return;
    }

    setPdfState("downloading");
    setError("");

    try {
      downloadResumePdf({
        user: auth.user,
        portfolio
      });
      setPdfState("done");
    } catch (err) {
      setError("Unable to generate the PDF right now. Please try again.");
      setPdfState("idle");
      return;
    }

    setTimeout(() => {
      setPdfState((current) => (current === "done" ? "idle" : current));
    }, 2500);
  };

  const handleTargetChange = (value) => {
    setSelectedTarget(value);
    setAiResult("");
    setAiError("");
  };

  const handleImprove = async () => {
    setAiLoading(true);
    setAiError("");

    try {
      const context = selectedTarget === "bio" ? "bio" : "project";
      const { data } = await api.post("/ai/improve", {
        text: assistantDraft,
        context
      });
      setAiResult(data.improvedText);
    } catch (err) {
      setAiError(err.response?.data?.message || "Unable to improve that text right now");
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyImprovement = () => {
    if (!aiResult) {
      return;
    }

    if (selectedTarget === "bio") {
      setPortfolio((current) => ({ ...current, bio: aiResult }));
      setAssistantDraft(aiResult);
      setSaveState("idle");
      return;
    }

    const [, rawIndex] = selectedTarget.split(":");
    const index = Number(rawIndex);

    setPortfolio((current) => {
      const projects = [...current.projects];
      projects[index] = {
        ...projects[index],
        description: aiResult
      };

      return { ...current, projects };
    });
    setAssistantDraft(aiResult);
    setSaveState("idle");
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (fetching) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10">
        <Loader label="Loading your portfolio workspace..." />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1600px] px-4 py-6 lg:px-6">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_minmax(440px,580px)]">
        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <Sidebar
            onDownloadPdf={handleDownloadPdf}
            onLogout={handleLogout}
            onSave={handleSave}
            pdfState={pdfState}
            saveState={saveState}
            user={auth.user}
          />
        </div>

        <main className="space-y-6">
          {error ? (
            <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-200">
              {error}
            </div>
          ) : null}
          <BuilderForm
            onFieldChange={handleFieldChange}
            onObjectFieldChange={handleObjectFieldChange}
            onListAdd={handleListAdd}
            onListChange={handleListChange}
            onListRemove={handleListRemove}
            portfolio={portfolio}
          />
          <AIAssistantPanel
            draftText={assistantDraft}
            error={aiError}
            improvedText={aiResult}
            loading={aiLoading}
            onApply={handleApplyImprovement}
            onDraftTextChange={setAssistantDraft}
            onImprove={handleImprove}
            onTargetChange={handleTargetChange}
            selectedTarget={selectedTarget}
            targetOptions={targetOptions}
          />
        </main>

        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <PreviewPanel portfolio={portfolio} user={auth.user} />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
