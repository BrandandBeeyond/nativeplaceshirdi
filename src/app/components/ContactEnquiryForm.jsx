"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  contact: "",
  subject: "",
  enquiryType: "",
  message: "",
};

export default function ContactEnquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact-enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Failed to submit enquiry.");
      }

      setForm(initialForm);
      setStatus({ type: "success", message: payload.message || "Enquiry submitted successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to submit enquiry." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#37433c]">Your name</span>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#37433c]">Contact number</span>
          <input
            type="tel"
            name="contact"
            required
            inputMode="numeric"
            maxLength={10}
            pattern="[0-9]{10}"
            value={form.contact}
            onChange={(event) => updateField("contact", event.target.value)}
            placeholder="10 digit mobile number"
            className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
          />
        </label>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#37433c]">Subject</span>
          <select
            name="subject"
            required
            value={form.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 focus:border-[#6b8444]"
          >
            <option value="" disabled>
              Select subject
            </option>
            <option value="Booking">Booking</option>
            <option value="Need info">Need info</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#37433c]">Enquiry type</span>
          <select
            name="enquiryType"
            required
            value={form.enquiryType}
            onChange={(event) => updateField("enquiryType", event.target.value)}
            className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 focus:border-[#6b8444]"
          >
            <option value="" disabled>
              Select enquiry type
            </option>
            <option value="URGENT">URGENT</option>
            <option value="REGULAR">REGULAR</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#37433c]">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Write your message here"
          className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-3 rounded-full bg-[#18352A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#2c4b38] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending..." : "Send Enquiry"}
          <span className="text-lg leading-none">-&gt;</span>
        </button>
        <p className="text-sm text-[#67716a]">All fields are required.</p>
      </div>

      {status.message ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm ${
            status.type === "error"
              ? "border border-red-200 bg-red-50 text-red-800"
              : "border border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
