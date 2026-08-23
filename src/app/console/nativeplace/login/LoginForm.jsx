"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, KeyRound, Lock, Sparkles, User } from "lucide-react";

export default function LoginForm({ nextPath = "/console/nativeplace" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const safeNextPath = useMemo(() => {
    if (typeof nextPath !== "string" || !nextPath.startsWith("/console/nativeplace")) {
      return "/console/nativeplace";
    }

    return nextPath;
  }, [nextPath]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/console/nativeplace/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to sign in.");
      }

      window.location.replace(safeNextPath);
    } catch (submitError) {
      setError(submitError.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(184,220,79,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(7,85,47,0.08),transparent_28%),linear-gradient(180deg,#f7f5ee_0%,#eef3ea_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1380px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[36px] border border-white/70 bg-white shadow-[0_30px_90px_rgba(36,48,38,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative overflow-hidden bg-[#18352a] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,220,79,0.26),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_22%)]" />
            <div className="absolute -left-20 top-10 h-48 w-48 rounded-full bg-[#b8dc4f]/10 blur-3xl" />
            <div className="absolute -bottom-10 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e8f2d0] backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  Admin Console
                </div>

                <h1 className="mt-6 max-w-xl font-heading text-[clamp(3rem,5vw,5.8rem)] leading-[0.92]">
                  Welcome back to The Native Place
                </h1>

                <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/80 sm:text-base">
                  Sign in with the admin username and password from your `.env` file to manage
                  the dashboard, reports and console tools.
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9e7ac]">
                    Secure Access
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    Login is restricted to the configured admin credentials only.
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9e7ac]">
                    Protected Route
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    The dashboard is available only after a valid sign in.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative bg-[#fcfbf5] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-16">
            <div className="mx-auto max-w-[560px]">
              <div className="mb-8">
                <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.38em] text-[#6b8444]">
                  Sign In
                </p>
                <h2 className="mt-3 font-heading text-[clamp(2.4rem,3.8vw,4.25rem)] leading-[0.98] text-[#20342b]">
                  Admin Login
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#5f665d]">
                  Enter your admin credentials to access the console.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#37433c]">
                    Username
                  </span>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b928a]" />
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      autoComplete="username"
                      placeholder="Admin username"
                      className="w-full rounded-2xl border border-[#d8ded8] bg-white px-11 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#37433c]">
                    Password
                  </span>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b928a]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      placeholder="Admin password"
                      className="w-full rounded-2xl border border-[#d8ded8] bg-white px-11 py-4 pr-12 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((open) => !open)}
                      className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#8b928a] transition-colors duration-300 hover:bg-[#f5f7f4] hover:text-[#20342b]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </label>

                {error ? (
                  <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#203f20] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4f6f1d] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <KeyRound className="h-4 w-4" />
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
