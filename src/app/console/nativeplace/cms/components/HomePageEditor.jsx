"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Loader2,
  PencilLine,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import ModalFrame from "./ModalFrame.jsx";
import { normalizeBannerList, normalizeHomeContent } from "../utils.js";

const createBlankBanner = (index) => ({
  _id: "",
  title: "",
  desktopImage: "",
  mobileImage: "",
  altText: "",
  link: "",
  sortOrder: index + 1,
  isActive: true,
});

const bannerHasContent = (banner) =>
  [banner.title, banner.desktopImage, banner.mobileImage, banner.altText, banner.link].some(
    (value) => String(value || "").trim().length > 0,
  );

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

function ImageUploadField({
  label,
  hint,
  value,
  previewAlt,
  onFileChange,
  onTextChange,
  placeholder,
  disabled,
}) {
  return (
    <Field label={label} hint={hint}>
      <div className="space-y-3">
        <label
          className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed border-[#d4d8c1] bg-[#faf9f1] px-4 py-3 text-sm font-medium text-[#18352a] transition hover:border-[#a3ca65] hover:bg-[#f4f8e8] ${
            disabled ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Upload className="h-4 w-4 text-[#6b8444]" />
            {value ? "Replace image file" : "Upload image file"}
          </span>
          <span className="text-xs uppercase tracking-[0.16em] text-[#6b8444]">
            {value ? "Cloudinary" : "Choose file"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFileChange}
            disabled={disabled}
          />
        </label>

        <input
          value={value}
          onChange={onTextChange}
          className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
          placeholder={placeholder}
          disabled={disabled}
        />

        {value ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-[#e6dcc5] bg-[#f7f5ec]">
            <Image
              src={value}
              alt={previewAlt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="rounded-[22px] border border-dashed border-[#d8d1bd] bg-[#faf8ef] px-4 py-8 text-center text-sm text-[#7a8276]">
            Upload an image to see the preview here.
          </div>
        )}
      </div>
    </Field>
  );
}

export default function HomePageEditor({ initialBanners = [], initialContent = {}, sourceWarning = "" }) {
  const [banners, setBanners] = useState(() => normalizeBannerList(initialBanners));
  const [homeContent, setHomeContent] = useState(() => normalizeHomeContent(initialContent));
  const [activeModal, setActiveModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const activeBannerCount = useMemo(
    () => banners.filter((banner) => banner.isActive).length,
    [banners],
  );

  const openModal = (modal) => {
    setActiveModal(modal);
    setNotice("");
    setError("");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSaving(false);
  };

  const updateBanner = (index, field, value) => {
    setBanners((current) =>
      current.map((banner, currentIndex) =>
        currentIndex === index ? { ...banner, [field]: value } : banner,
      ),
    );
  };

  const addBanner = () => {
    setBanners((current) => [...current, createBlankBanner(current.length)]);
  };

  const removeBanner = (index) => {
    setBanners((current) => current.filter((_, currentIndex) => currentIndex !== index));
  };

  const uploadBannerImage = async (index, field, file) => {
    if (!file) {
      return;
    }

    setUploadingBanner({ index, field });
    setError("");
    setNotice("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "folder",
        field === "mobileImage" ? "nativeplace/home-banners/mobile" : "nativeplace/home-banners",
      );

      const response = await fetch("/api/console/nativeplace/cms/home/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to upload image.");
      }

      updateBanner(index, field, payload.image?.url || "");
      setNotice("Image uploaded successfully.");
    } catch (uploadError) {
      setError(uploadError.message || "Unable to upload image.");
    } finally {
      setUploadingBanner(null);
    }
  };

  const saveBanners = async () => {
    const validBanners = banners.filter(bannerHasContent);

    if (validBanners.length === 0) {
      setError("Add at least one banner before saving.");
      return;
    }

    const invalidBanner = validBanners.find(
      (banner) => !String(banner.title || "").trim() || !String(banner.desktopImage || "").trim(),
    );

    if (invalidBanner) {
      setError("Every banner needs a title and desktop image path.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/console/nativeplace/cms/home/banners", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ banners: validBanners }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to save banners.");
      }

      setBanners(normalizeBannerList(payload.banners || validBanners));
      setNotice("Homepage banners saved successfully.");
      closeModal();
    } catch (saveError) {
      setError(saveError.message || "Unable to save banners.");
    } finally {
      setSaving(false);
    }
  };

  const saveHomeContent = async () => {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/console/nativeplace/cms/home/content", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: homeContent }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to save homepage content.");
      }

      setHomeContent(normalizeHomeContent(payload.content || homeContent));
      setNotice("Homepage content saved successfully.");
      closeModal();
    } catch (saveError) {
      setError(saveError.message || "Unable to save homepage content.");
    } finally {
      setSaving(false);
    }
  };

  const cardClass =
    "rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-7";

  return (
    <>
      <section className="grid gap-5 xl:grid-cols-2">
        <article className={cardClass}>
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]">
              <LayoutDashboard className="h-5 w-5" />
            </span>
            <button
              type="button"
              onClick={() => openModal("banners")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e6dcc5] bg-[#fbf8ef] text-[#18352a] transition hover:border-[#c8d69c] hover:bg-[#f1f7de]"
              aria-label="Edit homepage banners"
            >
              <PencilLine className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6b8444]">
              Slider Banners
            </p>
            <h3 className="mt-3 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] leading-tight text-[#18352a]">
              Edit the rotating homepage banners
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#66716a]">
              Manage the banner title, desktop image, mobile image, destination link and active
              order. This is the only place needed for homepage banner updates.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-[#e9e3d4] bg-[#fbf8ef] p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                Total banners
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#18352a]">
                {banners.length}
              </p>
            </div>
            <div className="rounded-[22px] border border-[#e9e3d4] bg-[#fbf8ef] p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                Active banners
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#18352a]">
                {activeBannerCount}
              </p>
            </div>
          </div>
        </article>

        <article className={cardClass}>
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]">
              <Sparkles className="h-5 w-5" />
            </span>
            <button
              type="button"
              onClick={() => openModal("content")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e6dcc5] bg-[#fbf8ef] text-[#18352a] transition hover:border-[#c8d69c] hover:bg-[#f1f7de]"
              aria-label="Edit homepage content"
            >
              <PencilLine className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6b8444]">
              Home Content
            </p>
            <h3 className="mt-3 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] leading-tight text-[#18352a]">
              Edit the homepage intro content
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#66716a]">
              Control the welcome line, main heading and the paragraph copy used on the homepage
              intro section.
            </p>
          </div>

          <div className="mt-6 rounded-[22px] border border-[#e9e3d4] bg-[#fbf8ef] p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
              Current headline
            </p>
            <p className="mt-2 font-heading text-2xl leading-tight text-[#18352a]">
              {homeContent.title}
            </p>
          </div>
        </article>
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

      {activeModal === "banners" ? (
        <ModalFrame
          title="Homepage Banners"
          description="Upload banner images to Cloudinary and manage the homepage slider from here."
          onClose={closeModal}
          footer={
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={addBanner}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d7dec6] bg-white px-5 py-3 text-sm font-semibold text-[#18352a] transition hover:bg-[#f2f7e4]"
              >
                <Plus className="h-4 w-4" />
                Add Banner
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-[#d7dec6] bg-white px-5 py-3 text-sm font-semibold text-[#18352a] transition hover:bg-[#f2f7e4]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveBanners}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18352a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#274335] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save banners"}
                </button>
              </div>
            </div>
          }
        >
          {error ? (
            <div className="mb-5 rounded-2xl border border-[#efc6c6] bg-[#fff6f6] px-4 py-3 text-sm text-[#9c3b3b]">
              {error}
            </div>
          ) : null}

          {uploadingBanner ? (
            <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[#0a1c13]/60 px-4">
              <div className="flex items-center gap-3 rounded-full border border-white/12 bg-[#102b1e]/95 px-6 py-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                <Loader2 className="h-5 w-5 animate-spin text-[#d8f184]" />
                <span className="text-sm font-medium">
                  Uploading {uploadingBanner.field === "mobileImage" ? "mobile" : "desktop"} image to Cloudinary...
                </span>
              </div>
            </div>
          ) : null}

          <div className="space-y-5">
            {banners.map((banner, index) => (
              <div
                key={banner._id || `banner-${index}`}
                className={`rounded-[24px] border border-[#e7e1d0] bg-[#fffdf7] p-5 shadow-[0_10px_24px_rgba(36,48,38,0.04)] ${
                  uploadingBanner?.index === index ? "pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b8444]">
                      Banner {index + 1}
                    </p>
                    <p className="mt-1 text-sm text-[#68726a]">Edit copy, images and order.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBanner(index)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5dcc8] text-[#7d5b5b] transition hover:bg-[#fff1f1]"
                    aria-label={`Remove banner ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Field label="Banner Title" hint="This is the heading shown on the slider.">
                    <input
                      value={banner.title}
                      onChange={(event) => updateBanner(index, "title", event.target.value)}
                      className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                      placeholder="Wake Up to Quiet, Green Luxury"
                    />
                  </Field>

                  <Field label="Sort Order" hint="Lower numbers appear first.">
                    <input
                      type="number"
                      value={banner.sortOrder}
                      onChange={(event) =>
                        updateBanner(index, "sortOrder", Number(event.target.value || 0))
                      }
                      className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                    />
                    </Field>

                  <ImageUploadField
                    label="Desktop Image"
                    hint="Upload the desktop banner image to Cloudinary or paste a URL."
                    value={banner.desktopImage}
                    previewAlt={banner.altText || banner.title || `Banner ${index + 1} desktop`}
                    onFileChange={(event) =>
                      uploadBannerImage(index, "desktopImage", event.target.files?.[0])
                    }
                    onTextChange={(event) =>
                      updateBanner(index, "desktopImage", event.target.value)
                    }
                    placeholder="Cloudinary URL or image path"
                    disabled={saving || Boolean(uploadingBanner)}
                  />

                  <ImageUploadField
                    label="Mobile Image"
                    hint="Optional responsive image for smaller screens."
                    value={banner.mobileImage}
                    previewAlt={banner.altText || banner.title || `Banner ${index + 1} mobile`}
                    onFileChange={(event) =>
                      uploadBannerImage(index, "mobileImage", event.target.files?.[0])
                    }
                    onTextChange={(event) =>
                      updateBanner(index, "mobileImage", event.target.value)
                    }
                    placeholder="Cloudinary URL or image path"
                    disabled={saving || Boolean(uploadingBanner)}
                  />

                  <Field label="Alt Text" hint="Helps with accessibility and SEO.">
                    <input
                      value={banner.altText}
                      onChange={(event) => updateBanner(index, "altText", event.target.value)}
                      className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                      placeholder="The Native Place banner image"
                    />
                  </Field>

                  <Field label="Link" hint="Optional destination for the banner CTA.">
                    <input
                      value={banner.link}
                      onChange={(event) => updateBanner(index, "link", event.target.value)}
                      className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                      placeholder="/contact"
                    />
                  </Field>
                </div>

                <label className="mt-5 inline-flex items-center gap-3 text-sm font-medium text-[#39453e]">
                  <input
                    type="checkbox"
                    checked={Boolean(banner.isActive)}
                    onChange={(event) => updateBanner(index, "isActive", event.target.checked)}
                    className="h-4 w-4 rounded border-[#b8c29d] text-[#6b8444] focus:ring-[#a3ca65]"
                  />
                  Active banner
                </label>
              </div>
            ))}
          </div>
        </ModalFrame>
      ) : null}

      {activeModal === "content" ? (
        <ModalFrame
          title="Homepage Content"
          description="Edit the intro section copy shown below the banner carousel."
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
                onClick={saveHomeContent}
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

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Eyebrow">
              <input
                value={homeContent.eyebrow}
                onChange={(event) =>
                  setHomeContent((current) => ({ ...current, eyebrow: event.target.value }))
                }
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="Welcome to The Native Place"
              />
            </Field>

            <Field label="Title">
              <input
                value={homeContent.title}
                onChange={(event) =>
                  setHomeContent((current) => ({ ...current, title: event.target.value }))
                }
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="A Sanctuary of Serenity in the Heart of Shirdi"
              />
            </Field>

            <Field label="Paragraph One" hint="Main intro copy used on the home page.">
              <textarea
                rows={6}
                value={homeContent.descriptionOne}
                onChange={(event) =>
                  setHomeContent((current) => ({
                    ...current,
                    descriptionOne: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm leading-7 text-[#18352a] outline-none transition focus:border-[#a3ca65]"
              />
            </Field>

            <Field label="Paragraph Two" hint="Supporting copy below the intro.">
              <textarea
                rows={6}
                value={homeContent.descriptionTwo}
                onChange={(event) =>
                  setHomeContent((current) => ({
                    ...current,
                    descriptionTwo: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm leading-7 text-[#18352a] outline-none transition focus:border-[#a3ca65]"
              />
            </Field>
          </div>
        </ModalFrame>
      ) : null}
    </>
  );
}
