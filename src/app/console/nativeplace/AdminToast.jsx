"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ToastContext = createContext(null);

let toastId = 0;

export function AdminToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    ({ title, message = "", tone = "success" }) => {
      const id = ++toastId;
      const toast = { id, title, message, tone };

      setToasts((current) => [toast, ...current].slice(0, 4));

      window.setTimeout(() => {
        dismiss(id);
      }, 3500);

      return id;
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      success: (title, message = "") => pushToast({ title, message, tone: "success" }),
      error: (title, message = "") => pushToast({ title, message, tone: "error" }),
      info: (title, message = "") => pushToast({ title, message, tone: "info" }),
      dismiss,
    }),
    [dismiss, pushToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[1000] flex w-[min(92vw,360px)] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-[20px] border bg-white px-4 py-3 shadow-[0_18px_45px_rgba(24,48,38,0.12)] ${
              toast.tone === "error"
                ? "border-[#f0c5c5]"
                : toast.tone === "info"
                  ? "border-[#cddfed]"
                  : "border-[#cde1a6]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className={`text-sm font-semibold ${
                    toast.tone === "error"
                      ? "text-[#9c3b3b]"
                      : toast.tone === "info"
                        ? "text-[#325d7e]"
                        : "text-[#39502e]"
                  }`}
                >
                  {toast.title}
                </p>
                {toast.message ? <p className="mt-1 text-sm leading-6 text-[#66716a]">{toast.message}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="text-[#94a19b] transition hover:text-[#18352a]"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useAdminToast() {
  const context = useContext(ToastContext);

  if (!context) {
    return {
      success: () => {},
      error: () => {},
      info: () => {},
      dismiss: () => {},
    };
  }

  return context;
}
