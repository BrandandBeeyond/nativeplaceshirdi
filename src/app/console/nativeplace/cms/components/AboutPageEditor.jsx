"use client";

import { useState } from "react";
import { FileText, HeartHandshake, PencilLine, Save, Sparkles } from "lucide-react";
import ModalFrame from "./ModalFrame.jsx";
import { normalizeAboutContent } from "../utils.js";

function Field({ label, children, hint }) {
  return (
    <label className="block space-y-2">
      <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
        {label}
      </span>
      {children}
      {hint ? <span className="block text-xs leading-5 text-[#8b917f]">{hint}</span> : null}
    </label>
  );
}

export default function AboutPageEditor({ initialContent = {}, sourceWarning = "" }) {
  const [aboutContent, setAboutContent] = useState(() => normalizeAboutContent(initialContent));
  const [activeSection, setActiveSection] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const openSection = (section) => {
    setActiveSection(section);
    setNotice("");
    setError("");
  };

  const closeModal = () => {
    setActiveSection(null);
    setSaving(false);
  };

  const saveSection = async () => {
    if (!activeSection) {
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/console/nativeplace/cms/about/content", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section: activeSection,
          data: aboutContent[activeSection],
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to save about content.");
      }

      setAboutContent(normalizeAboutContent(payload.content || aboutContent));
      setNotice("About content saved successfully.");
      closeModal();
    } catch (saveError) {
      setError(saveError.message || "Unable to save about content.");
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (section, field, value) => {
    setAboutContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
  };

  const cardClass =
    "rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-7";

  const sectionMeta = {
    story: {
      title: "About Content",
      description: "Edit the main story and welcome copy for the About Us page.",
      icon: FileText,
    },
    vision: {
      title: "Vision",
      description: "Edit the vision statement that appears on the About Us page.",
      icon: Sparkles,
    },
    mission: {
      title: "Mission",
      description: "Edit the mission statement that appears on the About Us page.",
      icon: HeartHandshake,
    },
  };

  return (
    <>
      <section className="grid gap-5 xl:grid-cols-3">
        {Object.entries(sectionMeta).map(([section, meta]) => {
          const Icon = meta.icon;

          return (
            <article key={section} className={cardClass}>
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]">
                  <Icon className="h-5 w-5" />
                </span>
                <button
                  type="button"
                  onClick={() => openSection(section)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e6dcc5] bg-[#fbf8ef] text-[#18352a] transition hover:border-[#c8d69c] hover:bg-[#f1f7de]"
                  aria-label={`Edit ${meta.title}`}
                >
                  <PencilLine className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6b8444]">
                  {meta.title}
                </p>
                <h3 className="mt-3 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] leading-tight text-[#18352a]">
                  {section === "story"
                    ? aboutContent.story.title
                    : aboutContent[section].title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#66716a]">
                  {meta.description}
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-[#e9e3d4] bg-[#fbf8ef] p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                  Current copy
                </p>
                <p className="mt-2 text-sm leading-7 text-[#39453e]">
                  {section === "story"
                    ? aboutContent.story.descriptionOne
                    : aboutContent[section].description}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {sourceWarning ? (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          {sourceWarning}
        </div>
      ) : null}

      {notice ? (
        <div className="mt-5 rounded-2xl border border-[#cde1a6] bg-[#f5fbeb] px-4 py-3 text-sm text-[#39502e]">
          {notice}
        </div>
      ) : null}

      {error ? (
        <div className="mt-5 rounded-2xl border border-[#efc6c6] bg-[#fff6f6] px-4 py-3 text-sm text-[#9c3b3b]">
          {error}
        </div>
      ) : null}

      {activeSection ? (
        <ModalFrame
          title={sectionMeta[activeSection].title}
          description={sectionMeta[activeSection].description}
          onClose={closeModal}
          footer={
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-[#d7dec6] bg-white px-5 py-3 text-sm font-semibold text-[#18352a] transition hover:bg-[#f2f7e4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSection}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18352a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#274335] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save content"}
              </button>
            </div>
          }
        >
          {error ? (
            <div className="mb-5 rounded-2xl border border-[#efc6c6] bg-[#fff6f6] px-4 py-3 text-sm text-[#9c3b3b]">
              {error}
            </div>
          ) : null}

          {activeSection === "story" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Eyebrow">
                <input
                  value={aboutContent.story.eyebrow}
                  onChange={(event) => updateSection("story", "eyebrow", event.target.value)}
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                />
              </Field>

              <Field label="Story Title">
                <input
                  value={aboutContent.story.title}
                  onChange={(event) => updateSection("story", "title", event.target.value)}
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                />
              </Field>

              <Field label="Paragraph One" hint="The main story copy shown on the About Us page.">
                <textarea
                  rows={6}
                  value={aboutContent.story.descriptionOne}
                  onChange={(event) =>
                    updateSection("story", "descriptionOne", event.target.value)
                  }
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm leading-7 text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                />
              </Field>

              <Field label="Paragraph Two" hint="The supporting paragraph for the story block.">
                <textarea
                  rows={6}
                  value={aboutContent.story.descriptionTwo}
                  onChange={(event) =>
                    updateSection("story", "descriptionTwo", event.target.value)
                  }
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm leading-7 text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Closing Line">
                  <input
                    value={aboutContent.story.closingLine}
                    onChange={(event) =>
                      updateSection("story", "closingLine", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                  />
                </Field>
              </div>
            </div>
          ) : null}

          {activeSection === "vision" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Eyebrow">
                <input
                  value={aboutContent.vision.eyebrow}
                  onChange={(event) => updateSection("vision", "eyebrow", event.target.value)}
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                />
              </Field>

              <Field label="Vision Title">
                <input
                  value={aboutContent.vision.title}
                  onChange={(event) => updateSection("vision", "title", event.target.value)}
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Vision Description">
                  <textarea
                    rows={6}
                    value={aboutContent.vision.description}
                    onChange={(event) =>
                      updateSection("vision", "description", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm leading-7 text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                  />
                </Field>
              </div>
            </div>
          ) : null}

          {activeSection === "mission" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Eyebrow">
                <input
                  value={aboutContent.mission.eyebrow}
                  onChange={(event) => updateSection("mission", "eyebrow", event.target.value)}
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                />
              </Field>

              <Field label="Mission Title">
                <input
                  value={aboutContent.mission.title}
                  onChange={(event) => updateSection("mission", "title", event.target.value)}
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Mission Description">
                  <textarea
                    rows={6}
                    value={aboutContent.mission.description}
                    onChange={(event) =>
                      updateSection("mission", "description", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm leading-7 text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                  />
                </Field>
              </div>
            </div>
          ) : null}
        </ModalFrame>
      ) : null}
    </>
  );
}
