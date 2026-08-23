import { FileText, Settings2, Sparkles, SquarePen } from "lucide-react";
import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";

export const metadata = { title: "CMS Pages | The Native Place", description: "Manage static website pages." };

const pageModules = [
  { title: "Homepage", description: "Hero, facilities and call-to-action sections.", icon: Sparkles },
  { title: "About Us", description: "Story, values and resort experience content.", icon: FileText },
  { title: "Contact Page", description: "Inquiry form copy and contact details.", icon: SquarePen },
  { title: "Global Settings", description: "Header, footer and shared site content.", icon: Settings2 },
];

export default async function CmsPagesPage() {
  await requireAdminSession("/console/nativeplace/cms/pages");

  return (
    <ConsoleShell pageTitle="CMS Pages" pageDescription="Edit the core pages that shape the public website experience.">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pageModules.map((module) => {
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
