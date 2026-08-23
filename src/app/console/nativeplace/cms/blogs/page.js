import { CalendarDays, FileText, PenTool, Sparkles } from "lucide-react";
import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";

export const metadata = { title: "CMS Blogs | The Native Place", description: "Create and manage blog posts." };

const blogModules = [
  { title: "Recent Blog", description: "Feature the latest story at the top of the blog feed.", icon: Sparkles },
  { title: "Scheduled Posts", description: "Plan upcoming content around events and announcements.", icon: CalendarDays },
  { title: "Draft Library", description: "Keep work-in-progress blogs organized in one place.", icon: FileText },
  { title: "Writing Tools", description: "Set tags, summaries and feature images before publishing.", icon: PenTool },
];

export default async function CmsBlogsPage() {
  await requireAdminSession("/console/nativeplace/cms/blogs");

  return (
    <ConsoleShell pageTitle="CMS Blogs" pageDescription="Manage resort stories, updates and featured blog content.">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {blogModules.map((module) => {
          const Icon = module.icon;
          return (
            <article key={module.title} className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-5 font-heading text-[clamp(1.6rem,2vw,2.2rem)] leading-tight text-[#18352a]">{module.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#66716a]">{module.description}</p>
            </article>
          );
        })}
      </section>
    </ConsoleShell>
  );
}
