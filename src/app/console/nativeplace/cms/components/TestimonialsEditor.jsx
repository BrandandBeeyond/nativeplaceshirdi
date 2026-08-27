"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Plus, Save, Sparkles, Trash2, Users } from "lucide-react";
import {
  createEmptyTestimonialForm,
  normalizeTestimonialRecord,
  testimonialRecordToFormState,
} from "@/app/lib/testimonial-utils.js";

function TestimonialCard({ testimonial, active, onEdit, onDelete }) {
  return (
    <article
      className={`rounded-[24px] border bg-white p-5 shadow-[0_12px_30px_rgba(36,48,38,0.05)] transition ${
        active ? "border-[#b8c89a]" : "border-[#e7e2d3]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]">
          <Users className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                testimonial.isPublished
                  ? "bg-[#edf6e1] text-[#507133]"
                  : "bg-[#f7f1df] text-[#8d6d2a]"
              }`}
            >
              {testimonial.isPublished ? "Published" : "Draft"}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-1 font-heading text-[1.35rem] leading-tight text-[#18352a]">
            {testimonial.personName}
          </h3>
          <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#88906e]">
            {testimonial.city}
          </p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#67726a]">
            {testimonial.content}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onEdit(testimonial)}
              className="rounded-full border border-[#d8dec8] bg-[#fbf8ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#18352a] transition hover:bg-[#f1f7de]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(testimonial)}
              className="rounded-full border border-[#f0d4d4] bg-[#fff7f7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9c3b3b] transition hover:bg-[#ffecec]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsEditor({ initialTestimonials = [], sourceWarning = "" }) {
  const [testimonials, setTestimonials] = useState(() =>
    initialTestimonials.map(normalizeTestimonialRecord),
  );
  const [form, setForm] = useState(() => createEmptyTestimonialForm());
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const listRef = useRef(null);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const loadTestimonial = (testimonial) => {
    const normalized = normalizeTestimonialRecord(testimonial);
    setForm(testimonialRecordToFormState(normalized));
    setNotice("");
    setError("");
  };

  const newTestimonial = () => {
    setForm(createEmptyTestimonialForm());
    setNotice("");
    setError("");
  };

  useEffect(() => {
    if (!form._id) {
      setTimeout(() => {
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [form._id]);

  const saveTestimonial = async (isPublished) => {
    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      testimonialId: form._id || undefined,
      personName: form.personName,
      city: form.city,
      content: form.content,
      isPublished,
    };

    try {
      const response = await fetch("/api/console/nativeplace/cms/testimonials", {
        method: form._id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save testimonial.");
      }

      const nextTestimonial = normalizeTestimonialRecord(result.testimonial);

      setTestimonials((current) => {
        const filtered = current.filter((item) => item._id !== nextTestimonial._id);
        return [nextTestimonial, ...filtered];
      });

      setForm(testimonialRecordToFormState(nextTestimonial));
      setNotice(result.message || "Testimonial saved successfully.");
    } catch (saveError) {
      setError(saveError.message || "Unable to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (testimonial) => {
    const confirmed = window.confirm(`Delete "${testimonial.personName}"?`);
    if (!confirmed) {
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/console/nativeplace/cms/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonialId: testimonial._id }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete testimonial.");
      }

      setTestimonials((current) => current.filter((item) => item._id !== testimonial._id));

      if (form._id === testimonial._id) {
        newTestimonial();
      }

      setNotice(result.message || "Testimonial deleted successfully.");
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete testimonial.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {sourceWarning ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          {sourceWarning}
        </div>
      ) : null}

      {notice ? (
        <div className="rounded-2xl border border-[#cde1a6] bg-[#f5fbeb] px-4 py-3 text-sm text-[#39502e]">
          {notice}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-[#efc6c6] bg-[#fff6f6] px-4 py-3 text-sm text-[#9c3b3b]">
          {error}
        </div>
      ) : null}

      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]">
          <p className="text-sm font-medium text-[#637069]">Total Testimonials</p>
          <h3 className="mt-3 font-heading text-[clamp(2rem,3vw,2.9rem)] leading-none text-[#18352a]">
            {testimonials.length}
          </h3>
        </article>
        <article className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]">
          <p className="text-sm font-medium text-[#637069]">Published</p>
          <h3 className="mt-3 font-heading text-[clamp(2rem,3vw,2.9rem)] leading-none text-[#18352a]">
            {testimonials.filter((item) => item.isPublished).length}
          </h3>
        </article>
        <article className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]">
          <p className="text-sm font-medium text-[#637069]">Drafts</p>
          <h3 className="mt-3 font-heading text-[clamp(2rem,3vw,2.9rem)] leading-none text-[#18352a]">
            {testimonials.filter((item) => !item.isPublished).length}
          </h3>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                Testimonial Editor
              </p>
              <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
                Create live guest testimonials
              </h3>
            </div>

            <button
              type="button"
              onClick={newTestimonial}
              className="inline-flex items-center gap-2 rounded-full border border-[#d7dec6] bg-[#fbf8ef] px-5 py-3 text-sm font-semibold text-[#18352a] transition hover:bg-[#f2f7e4]"
            >
              <Plus className="h-4 w-4" />
              New Testimonial
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label className="block space-y-2 md:col-span-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                Person Name
              </span>
              <input
                value={form.personName}
                onChange={(event) => setField("personName", event.target.value)}
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="Adarsh Shinde"
              />
            </label>

            <label className="block space-y-2 md:col-span-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                City
              </span>
              <input
                value={form.city}
                onChange={(event) => setField("city", event.target.value)}
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="Shirdi"
              />
            </label>

            <label className="block space-y-2 md:col-span-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                Content
              </span>
              <textarea
                rows={5}
                value={form.content}
                onChange={(event) => setField("content", event.target.value)}
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm leading-7 text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="Write the testimonial content here..."
              />
            </label>
          </div>

          <div className="mt-6 rounded-[24px] border border-[#e9e3d4] bg-[#fbf8ef] p-5">
            <label className="inline-flex items-center gap-3 text-sm font-medium text-[#39453e]">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(event) => setField("isPublished", event.target.checked)}
                className="h-4 w-4 rounded border-[#b8c29d] text-[#6b8444] focus:ring-[#a3ca65]"
              />
              Publish live
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => saveTestimonial(false)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d7dec6] bg-white px-5 py-3 text-sm font-semibold text-[#18352a] transition hover:bg-[#f2f7e4] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => saveTestimonial(true)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18352a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#274335] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Eye className="h-4 w-4" />
              {saving ? "Publishing..." : form._id ? "Update & Publish" : "Publish Live"}
            </button>
          </div>
        </article>

        <aside ref={listRef} className="space-y-6">
          <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
              Existing Testimonials
            </p>
            <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.4vw,2.6rem)] text-[#18352a]">
              Manage published and draft testimonials
            </h3>

            <div className="mt-6 space-y-4">
              {testimonials.length ? (
                testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial._id}
                    testimonial={testimonial}
                    active={form._id === testimonial._id}
                    onEdit={loadTestimonial}
                    onDelete={deleteTestimonial}
                  />
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-[#d8d1bd] bg-[#faf8ef] px-4 py-8 text-center text-sm text-[#7a8276]">
                  No testimonials created yet. Use the editor to publish your first guest review.
                </div>
              )}
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
