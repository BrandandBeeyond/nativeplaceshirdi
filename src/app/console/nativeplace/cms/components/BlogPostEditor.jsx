"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  CalendarDays,
  Code2,
  Eye,
  Italic,
  Link2,
  Plus,
  Save,
  Sparkles,
  Upload,
  Trash2,
  Underline,
} from "lucide-react";
import {
  blogToFormState,
  createEmptyBlogForm,
  formatBlogDate,
  normalizeBlogRecord,
  slugifyBlog,
  splitKeywords,
} from "@/app/lib/blog-utils.js";

const toolbarActions = [
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Underline", icon: Underline, command: "underline" },
  { label: "H2", icon: Sparkles, command: "formatBlock", value: "h2" },
  { label: "Code", icon: Code2, command: "formatBlock", value: "pre" },
  { label: "Bullet list", icon: Plus, command: "insertUnorderedList" },
  { label: "Numbered list", icon: CalendarDays, command: "insertOrderedList" },
  { label: "Link", icon: Link2, command: "createLink" },
];

const applyCommand = (command, value = null) => {
  document.execCommand(command, false, value);
};

function RichTextEditor({ value, onChange, editorRef }) {
  const innerRef = editorRef || useRef(null);

  useEffect(() => {
    if (innerRef.current && innerRef.current.innerHTML !== value) {
      innerRef.current.innerHTML = value || "<p><br></p>";
    }
  }, [value, innerRef]);

  const handleToolbarAction = (action) => {
    innerRef.current?.focus();

    if (action.command === "createLink") {
      const url = window.prompt("Enter a URL for the selected text:");

      if (!url) {
        return;
      }

      applyCommand(action.command, url);
      onChange(innerRef.current?.innerHTML || "");
      return;
    }

    applyCommand(action.command, action.value || null);
    onChange(innerRef.current?.innerHTML || "");
  };

  return (
    <div className="rounded-[26px] border border-[#d9d4bf] bg-white shadow-[0_10px_26px_rgba(36,48,38,0.04)]">
      <div className="flex flex-wrap gap-2 border-b border-[#ece3cf] bg-[#fbf8ef] p-3">
        {toolbarActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={() => handleToolbarAction(action)}
              className="inline-flex items-center gap-2 rounded-full border border-[#e1d8c2] bg-white px-3 py-2 text-xs font-semibold text-[#18352a] transition hover:border-[#b8c89a] hover:bg-[#f5f9ea]"
              aria-label={action.label}
            >
              <Icon className="h-3.5 w-3.5 text-[#6b8444]" />
              {action.label}
            </button>
          );
        })}
      </div>

      <div
        ref={innerRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="min-h-[360px] px-5 py-4 text-[15px] leading-8 text-[#18352a] outline-none"
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}

function BlogCard({ blog, active, onEdit, onDelete }) {
  return (
    <article
      className={`rounded-[24px] border bg-white p-5 shadow-[0_12px_30px_rgba(36,48,38,0.05)] transition ${
        active ? "border-[#b8c89a]" : "border-[#e7e2d3]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[18px] bg-[#f4f1e5]">
          {blog.thumbnail ? (
            <Image src={blog.thumbnail} alt={blog.name || blog.title} fill className="object-cover" />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                blog.isPublished
                  ? "bg-[#edf6e1] text-[#507133]"
                  : "bg-[#f7f1df] text-[#8d6d2a]"
              }`}
            >
              {blog.isPublished ? "Published" : "Draft"}
            </span>
            {blog.publishedAt ? (
              <span className="text-xs text-[#738078]">{formatBlogDate(blog.publishedAt)}</span>
            ) : null}
          </div>

          <h3 className="mt-3 line-clamp-2 font-heading text-[1.35rem] leading-tight text-[#18352a]">
            {blog.name || blog.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#67726a]">
            {blog.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onEdit(blog)}
              className="rounded-full border border-[#d8dec8] bg-[#fbf8ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#18352a] transition hover:bg-[#f1f7de]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(blog)}
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

export default function BlogPostEditor({ initialBlogs = [], sourceWarning = "" }) {
  const [blogs, setBlogs] = useState(() => initialBlogs.map(normalizeBlogRecord));
  const [form, setForm] = useState(() => createEmptyBlogForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = form.content || "<p>Start writing your blog content here...</p>";
    }
  }, [form._id]);

  const setField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (!current._id && (field === "name" || field === "title") && !current.slug) {
        next.slug = slugifyBlog(next.name || next.title);
      }

      return next;
    });
  };

  const loadBlog = (blog) => {
    const normalized = normalizeBlogRecord(blog);
    setForm(blogToFormState(normalized));
    setNotice("");
    setError("");
  };

  const newBlog = () => {
    setForm(createEmptyBlogForm());
    setNotice("");
    setError("");
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = "<p>Start writing your blog content here...</p>";
      }
    }, 0);
  };

  const uploadThumbnail = async (file) => {
    if (!file) {
      return;
    }

    setUploading(true);
    setError("");
    setNotice("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "nativeplace/blogs");

      const response = await fetch("/api/console/nativeplace/cms/home/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to upload thumbnail.");
      }

      setField("thumbnail", payload.image?.url || "");
      setNotice("Thumbnail uploaded successfully.");
    } catch (uploadError) {
      setError(uploadError.message || "Unable to upload thumbnail.");
    } finally {
      setUploading(false);
    }
  };

  const saveBlog = async (isPublished) => {
    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      blogId: form._id || undefined,
      name: form.name,
      title: form.title,
      keywords: form.keywords,
      description: form.description,
      content: editorRef.current?.innerHTML || form.content,
      thumbnail: form.thumbnail,
      isPublished,
    };

    try {
      const response = await fetch("/api/console/nativeplace/cms/blogs", {
        method: form._id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save blog.");
      }

      const nextBlog = normalizeBlogRecord(result.blog);

      setBlogs((current) => {
        const filtered = current.filter((item) => item._id !== nextBlog._id);
        return [nextBlog, ...filtered].sort((left, right) => {
          const leftDate = new Date(left.publishedAt || left.updatedAt || 0).getTime();
          const rightDate = new Date(right.publishedAt || right.updatedAt || 0).getTime();

          return rightDate - leftDate;
        });
      });

      setForm(blogToFormState(nextBlog));
      if (editorRef.current) {
        editorRef.current.innerHTML = nextBlog.content || "<p>Start writing your blog content here...</p>";
      }

      setNotice(result.message || "Blog saved successfully.");
    } catch (saveError) {
      setError(saveError.message || "Unable to save blog.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (blog) => {
    const confirmed = window.confirm(`Delete "${blog.name || blog.title}"?`);

    if (!confirmed) {
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/console/nativeplace/cms/blogs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: blog._id }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete blog.");
      }

      setBlogs((current) => current.filter((item) => item._id !== blog._id));

      if (form._id === blog._id) {
        newBlog();
      }

      setNotice(result.message || "Blog deleted successfully.");
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete blog.");
    } finally {
      setSaving(false);
    }
  };

  const total = blogs.length;
  const published = blogs.filter((blog) => blog.isPublished).length;
  const drafts = total - published;

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
          <p className="text-sm font-medium text-[#637069]">Total Blogs</p>
          <h3 className="mt-3 font-heading text-[clamp(2rem,3vw,2.9rem)] leading-none text-[#18352a]">
            {total}
          </h3>
        </article>
        <article className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]">
          <p className="text-sm font-medium text-[#637069]">Published</p>
          <h3 className="mt-3 font-heading text-[clamp(2rem,3vw,2.9rem)] leading-none text-[#18352a]">
            {published}
          </h3>
        </article>
        <article className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]">
          <p className="text-sm font-medium text-[#637069]">Drafts</p>
          <h3 className="mt-3 font-heading text-[clamp(2rem,3vw,2.9rem)] leading-none text-[#18352a]">
            {drafts}
          </h3>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                Blog Editor
              </p>
              <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
                Create a live blog post
              </h3>
            </div>

            <button
              type="button"
              onClick={newBlog}
              className="inline-flex items-center gap-2 rounded-full border border-[#d7dec6] bg-[#fbf8ef] px-5 py-3 text-sm font-semibold text-[#18352a] transition hover:bg-[#f2f7e4]"
            >
              <Plus className="h-4 w-4" />
              New Blog
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                Blog Name
              </span>
              <input
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="Best Website Design Company in Nashik"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                Title
              </span>
              <input
                value={form.title}
                onChange={(event) => setField("title", event.target.value)}
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="Best Website Design Company in Nashik: Why Businesses Need a High-Converting Website in 2026"
              />
            </label>

            <label className="block space-y-2 md:col-span-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                Keywords
              </span>
              <input
                value={form.keywords}
                onChange={(event) => setField("keywords", event.target.value)}
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="website design company in Nashik, web development, SEO, Nashik"
              />
            </label>

            <label className="block space-y-2 md:col-span-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                Description
              </span>
              <textarea
                rows={4}
                value={form.description}
                onChange={(event) => setField("description", event.target.value)}
                className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm leading-7 text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                placeholder="Short meta description and blog summary."
              />
            </label>

            <label className="block space-y-2 md:col-span-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                Blog Thumbnail
              </span>

              <div className="space-y-3">
                <label
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed border-[#d4d8c1] bg-[#faf9f1] px-4 py-3 text-sm font-medium text-[#18352a] transition hover:border-[#a3ca65] hover:bg-[#f4f8e8] ${
                    uploading ? "cursor-not-allowed opacity-60" : ""
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Upload className="h-4 w-4 text-[#6b8444]" />
                    {form.thumbnail ? "Replace thumbnail image" : "Upload thumbnail image"}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-[#6b8444]">
                    Choose file
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => uploadThumbnail(event.target.files?.[0])}
                    disabled={uploading}
                  />
                </label>

                <input
                  value={form.thumbnail}
                  onChange={(event) => setField("thumbnail", event.target.value)}
                  className="w-full rounded-2xl border border-[#d9d4bf] bg-white px-4 py-3 text-sm text-[#18352a] outline-none transition focus:border-[#a3ca65]"
                  placeholder="Cloudinary URL or image path"
                />

                {form.thumbnail ? (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-[#e6dcc5] bg-[#f7f5ec]">
                    <Image src={form.thumbnail} alt={form.name || form.title} fill className="object-cover" />
                  </div>
                ) : null}
              </div>
            </label>

            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                  Blog Content
                </span>
                <span className="text-xs text-[#7d8579]">
                  Rich text area for copy-paste content and formatting
                </span>
              </div>
              <div className="mt-3">
                <RichTextEditor value={form.content} onChange={(html) => setField("content", html)} editorRef={editorRef} />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-[#e9e3d4] bg-[#fbf8ef] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#6b8444]">
                  SEO Preview
                </p>
                <p className="mt-2 text-sm text-[#66716a]">
                  {form.slug ? `/blogs/${form.slug}` : "/blogs/your-blog-slug"}
                </p>
              </div>
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
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => saveBlog(false)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d7dec6] bg-white px-5 py-3 text-sm font-semibold text-[#18352a] transition hover:bg-[#f2f7e4] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => saveBlog(true)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18352a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#274335] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Eye className="h-4 w-4" />
              {saving ? "Publishing..." : form._id ? "Update & Publish" : "Publish Live"}
            </button>
          </div>
        </article>

        <aside className="space-y-6">
          <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
              Live Preview
            </p>
            <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
              {form.name || "Blog name appears here"}
            </h3>

            {form.thumbnail ? (
              <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[24px] border border-[#e6dcc5] bg-[#f7f5ec]">
                <Image src={form.thumbnail} alt={form.name || form.title} fill className="object-cover" />
              </div>
            ) : null}

            <p className="mt-5 text-sm leading-7 text-[#66716a]">
              {form.description || "Your SEO description will appear here as the blog summary."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {splitKeywords(form.keywords).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[#d9dcc9] bg-[#fbf8ef] px-3 py-1 text-xs font-medium text-[#53604b]"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div
              className="prose prose-sm mt-6 max-w-none prose-headings:font-heading prose-headings:text-[#18352a] prose-p:text-[#566155]"
              dangerouslySetInnerHTML={{ __html: form.content || "<p></p>" }}
            />
          </article>

          <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                  Existing Posts
                </p>
                <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.4vw,2.6rem)] text-[#18352a]">
                  Manage published and draft blogs
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {blogs.length ? (
                blogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    active={form._id === blog._id}
                    onEdit={loadBlog}
                    onDelete={deleteBlog}
                  />
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-[#d8d1bd] bg-[#faf8ef] px-4 py-8 text-center text-sm text-[#7a8276]">
                  No blogs created yet. Use the editor to publish your first post.
                </div>
              )}
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
