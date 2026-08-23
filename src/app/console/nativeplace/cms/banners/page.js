import { Image, Layers3, MonitorSmartphone, Sparkles } from "lucide-react";
import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";

export const metadata = { title: "CMS Banners | The Native Place", description: "Manage banners and hero sections." };

const bannerModules = [
  { title: "Homepage Hero", description: "Update the main visual banner shown first to visitors.", icon: Sparkles },
  { title: "Section Banners", description: "Handle feature cards for experiences and facilities.", icon: Layers3 },
  { title: "Mobile Variants", description: "Prepare responsive banner images for smaller screens.", icon: MonitorSmartphone },
  { title: "Image Library", description: "Keep approved visuals organized for reuse.", icon: Image },
];

export default async function CmsBannersPage() {
  await requireAdminSession("/console/nativeplace/cms/banners");

  return (
    <ConsoleShell pageTitle="CMS Banners" pageDescription="Manage the visual banners and promotional sections used across the site.">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {bannerModules.map((module) => {
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
