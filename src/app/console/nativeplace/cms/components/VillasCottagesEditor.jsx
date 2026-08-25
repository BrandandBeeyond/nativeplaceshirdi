"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Image as ImageIcon,
  Images,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { normalizeStayContent } from "@/app/lib/stay-content.js";

function Field({ label, hint, children }) {
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

function SingleImageField({
  label,
  hint,
  value,
  alt,
  onTextChange,
  onFileChange,
  onClear,
  uploading,
}) {
  const hasValue = Boolean(String(value || "").trim());

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-3 rounded-[24px] border border-[#e5dec8] bg-[#fbf8ef] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#dcd5c0] bg-white px-4 py-2 text-sm font-medium text-[#18352a] transition hover:border-[#b7c984] hover:bg-[#f3f8e9]">
            <Upload className="h-4 w-4 text-[#6b8444]" />
            {uploading ? "Uploading..." : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onFileChange}
              disabled={uploading}
            />
          </label>

          {hasValue ? (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-full border border-[#e0d7bf] bg-white px-4 py-2 text-sm font-medium text-[#7a5445] transition hover:bg-[#fff3f0]"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          ) : null}
        </div>

        <input
          value={value}
          onChange={onTextChange}
          className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
          placeholder="Paste Cloudinary image URL here"
        />

        {hasValue ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-[#e6dcc5] bg-[#f7f5ec]">
            <Image src={value} alt={alt} fill className="object-cover" unoptimized={false} />
          </div>
        ) : (
          <div className="rounded-[22px] border border-dashed border-[#d8d1bd] bg-[#faf8ef] px-4 py-8 text-center text-sm text-[#7a8276]">
            Upload an image to preview it here.
          </div>
        )}
      </div>
    </Field>
  );
}

function GalleryField({ label, hint, items, onAdd, onChange, onRemove, onFileChange, uploadingKey }) {
  return (
    <Field label={label} hint={hint}>
      <div className="space-y-4">
        {items.map((item, index) => {
          const hasValue = Boolean(String(item || "").trim());

          return (
            <div
              key={`${label}-${index}`}
              className="rounded-[24px] border border-[#e5dec8] bg-[#fbf8ef] p-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#dcd5c0] bg-white px-4 py-2 text-sm font-medium text-[#18352a] transition hover:border-[#b7c984] hover:bg-[#f3f8e9]">
                  <Upload className="h-4 w-4 text-[#6b8444]" />
                  {uploadingKey ? "Uploading..." : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => onFileChange(index, event)}
                    disabled={Boolean(uploadingKey)}
                  />
                </label>

                {hasValue ? (
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#e0d7bf] bg-white px-4 py-2 text-sm font-medium text-[#7a5445] transition hover:bg-[#fff3f0]"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                ) : null}
              </div>

              <input
                value={item}
                onChange={(event) => onChange(index, event.target.value)}
                className="mt-3 w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="Paste Cloudinary image URL here"
              />

              {hasValue ? (
                <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-[22px] border border-[#e6dcc5] bg-[#f7f5ec]">
                  <Image src={item} alt={`${label} ${index + 1}`} fill className="object-cover" />
                </div>
              ) : null}
            </div>
          );
        })}

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#c8d69c] bg-[#f4f8e8] px-4 py-2 text-sm font-medium text-[#476028] transition hover:bg-[#eef5da]"
        >
          <Plus className="h-4 w-4" />
          Add image
        </button>
      </div>
    </Field>
  );
}

function StayTabCard({ title, description, active, onClick, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[26px] border p-5 text-left transition ${
        active
          ? "border-[#a3ca65] bg-[#f4f8e8] shadow-[0_14px_36px_rgba(24,53,42,0.08)]"
          : "border-[#e7e2d3] bg-white hover:border-[#c8d69c]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]">
          {title === "Villas" ? <Images className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
        </span>
        <span className="rounded-full bg-[#fbf8ef] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
          {count} images
        </span>
      </div>
      <h3 className="mt-5 font-heading text-[clamp(1.6rem,2vw,2.2rem)] leading-tight text-[#18352a]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#66716a]">{description}</p>
    </button>
  );
}

export default function VillasCottagesEditor({
  initialVillas = {},
  initialCottages = {},
  sourceWarning = "",
}) {
  const [activeTab, setActiveTab] = useState("villas");
  const [drafts, setDrafts] = useState(() => ({
    villas: normalizeStayContent("villas", initialVillas),
    cottages: normalizeStayContent("cottages", initialCottages),
  }));
  const [saving, setSaving] = useState(null);
  const [uploadingKey, setUploadingKey] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const activeDraft = drafts[activeTab];
  const tabs = useMemo(
    () => [
      {
        slug: "villas",
        title: "Villas",
        description: "Manage banner, hero carousel, intro image and gallery visuals.",
      },
      {
        slug: "cottages",
        title: "Cottages",
        description: "Manage banner, hero carousel, intro image and gallery visuals.",
      },
    ],
    [],
  );

  const updateDraft = (slug, updater) => {
    setDrafts((current) => ({
      ...current,
      [slug]: updater(current[slug]),
    }));
  };

  const addImage = (slug, field) => {
    updateDraft(slug, (current) => ({
      ...current,
      [field]: [...(current[field] || []), ""],
    }));
  };

  const removeImage = (slug, field, index) => {
    updateDraft(slug, (current) => ({
      ...current,
      [field]: (current[field] || []).filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const updateImage = (slug, field, index, value) => {
    updateDraft(slug, (current) => ({
      ...current,
      [field]: (current[field] || []).map((item, currentIndex) =>
        currentIndex === index ? value : item,
      ),
    }));
  };

  const uploadToCloudinary = async (slug, field, file) => {
    if (!file) {
      return "";
    }

    const folder = `nativeplace/stays/${slug}/${field}`;
    setUploadingKey(`${slug}:${field}`);
    setError("");
    setNotice("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/console/nativeplace/cms/home/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to upload image.");
      }

      return payload.image?.url || "";
    } finally {
      setUploadingKey("");
    }
  };

  const handleSingleFileUpload = async (slug, field, event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const url = await uploadToCloudinary(slug, field, file);

    if (!url) {
      return;
    }

    updateDraft(slug, (current) => ({
      ...current,
      [field]: url,
    }));
  };

  const handleArrayFileUpload = async (slug, field, index, event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const url = await uploadToCloudinary(slug, field, file);

    if (!url) {
      return;
    }

    updateImage(slug, field, index, url);
  };

  const saveStay = async (slug) => {
    setSaving(slug);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/console/nativeplace/cms/stays", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          content: drafts[slug],
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to save stay images.");
      }

      setDrafts((current) => ({
        ...current,
        [slug]: normalizeStayContent(slug, payload.content || current[slug]),
      }));
      setNotice(`${slug === "villas" ? "Villas" : "Cottages"} images saved successfully.`);
    } catch (saveError) {
      setError(saveError.message || "Unable to save stay images.");
    } finally {
      setSaving(null);
    }
  };

  const currentTabMeta = tabs.find((tab) => tab.slug === activeTab) || tabs[0];

  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-2">
        {tabs.map((tab) => {
          const currentDraft = drafts[tab.slug];

          return (
            <StayTabCard
              key={tab.slug}
              title={tab.title}
              description={tab.description}
              active={activeTab === tab.slug}
              onClick={() => setActiveTab(tab.slug)}
              count={(currentDraft.heroImages?.length || 0) + (currentDraft.galleryImages?.length || 0)}
            />
          );
        })}
      </section>

      {sourceWarning ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          {sourceWarning}
        </div>
      ) : null}

      <section className="rounded-[30px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
              {currentTabMeta.title} Images
            </p>
            <h3 className="mt-2 font-heading text-[clamp(1.9rem,2.6vw,3rem)] text-[#18352a]">
              Manage the visuals shown on the public page
            </h3>
          </div>

          <button
            type="button"
            onClick={() => saveStay(activeTab)}
            disabled={saving === activeTab || uploadingKey}
            className="inline-flex items-center gap-2 rounded-full bg-[#204f30] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d6138] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving === activeTab ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save {currentTabMeta.title}
          </button>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <SingleImageField
              label="Banner Image"
              hint="Shown as the page banner."
              value={activeDraft.bannerImage}
              alt={`${currentTabMeta.title} banner`}
              onTextChange={(event) =>
                updateDraft(activeTab, (current) => ({
                  ...current,
                  bannerImage: event.target.value,
                }))
              }
              onFileChange={(event) => handleSingleFileUpload(activeTab, "bannerImage", event)}
              onClear={() =>
                updateDraft(activeTab, (current) => ({
                  ...current,
                  bannerImage: "",
                }))
              }
              uploading={uploadingKey === `${activeTab}:bannerImage`}
            />

            <SingleImageField
              label="Intro Image"
              hint="Used in the section beside the story copy."
              value={activeDraft.introImage}
              alt={`${currentTabMeta.title} intro`}
              onTextChange={(event) =>
                updateDraft(activeTab, (current) => ({
                  ...current,
                  introImage: event.target.value,
                }))
              }
              onFileChange={(event) => handleSingleFileUpload(activeTab, "introImage", event)}
              onClear={() =>
                updateDraft(activeTab, (current) => ({
                  ...current,
                  introImage: "",
                }))
              }
              uploading={uploadingKey === `${activeTab}:introImage`}
            />
          </div>

          <div className="space-y-6">
            <GalleryField
              label="Hero Carousel Images"
              hint="These images rotate at the top of the public stay page."
              items={activeDraft.heroImages || []}
              onAdd={() => addImage(activeTab, "heroImages")}
              onChange={(index, value) => updateImage(activeTab, "heroImages", index, value)}
              onRemove={(index) => removeImage(activeTab, "heroImages", index)}
              onFileChange={(index, event) => handleArrayFileUpload(activeTab, "heroImages", index, event)}
              uploadingKey={uploadingKey === `${activeTab}:heroImages`}
            />

            <GalleryField
              label="Gallery Images"
              hint="These images appear in the gallery section lower on the page."
              items={activeDraft.galleryImages || []}
              onAdd={() => addImage(activeTab, "galleryImages")}
              onChange={(index, value) => updateImage(activeTab, "galleryImages", index, value)}
              onRemove={(index) => removeImage(activeTab, "galleryImages", index)}
              onFileChange={(index, event) =>
                handleArrayFileUpload(activeTab, "galleryImages", index, event)
              }
              uploadingKey={uploadingKey === `${activeTab}:galleryImages`}
            />
          </div>
        </div>

        {notice || error ? (
          <div
            className={`mt-6 rounded-2xl px-4 py-3 text-sm leading-6 ${
              error
                ? "border border-red-200 bg-red-50 text-red-900"
                : "border border-emerald-200 bg-emerald-50 text-emerald-900"
            }`}
          >
            {error || notice}
          </div>
        ) : null}
      </section>
    </div>
  );
}
