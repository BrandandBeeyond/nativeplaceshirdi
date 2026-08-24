"use client";

import { X } from "lucide-react";

export default function ModalFrame({ title, description, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#07170f]/65 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-[#e3dcc9] bg-[#fffdf7] shadow-[0_30px_80px_rgba(19,35,24,0.3)] max-h-[82vh]">
        <div className="flex items-start justify-between gap-6 border-b border-[#ece3cf] px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[#6b8444]">
              CMS Editor
            </p>
            <h3 className="mt-2 font-heading text-[clamp(1.7rem,2.4vw,2.5rem)] leading-tight text-[#18352a]">
              {title}
            </h3>
            {description ? (
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#67726a]">{description}</p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e3dcc9] bg-white text-[#18352a] transition hover:bg-[#f1f5e5]"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">{children}</div>

        {footer ? (
          <div className="border-t border-[#ece3cf] bg-[#fffdf7] px-6 py-5 sm:px-8">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
