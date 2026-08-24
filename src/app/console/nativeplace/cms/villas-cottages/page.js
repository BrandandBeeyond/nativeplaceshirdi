import { Image, Images, Palette, Sparkles } from "lucide-react";
import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";

export const metadata = { title: "Villas & Cottages CMS | The Native Place", description: "Manage gallery images for villas and cottages." };

const villaModules = [
  { title: "Villa Images", description: "Update villa gallery images only.", icon: Images },
  { title: "Cottage Images", description: "Update cottage gallery images only.", icon: Image },
  { title: "Gallery Order", description: "Control the order of displayed photos.", icon: Palette },
  { title: "Featured Shots", description: "Choose the lead images shown first.", icon: Sparkles },
];

export default async function CmsVillasCottagesPage() {
  await requireAdminSession("/console/nativeplace/cms/villas-cottages");

  return (
    <ConsoleShell pageTitle="Villas & Cottages" pageDescription="Manage images for villas and cottages. Keep content focused on visuals only.">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {villaModules.map((module) => {
          const Icon = module.icon;
          return (
            <article
              key={module.title}
              className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-heading text-[clamp(1.6rem,2vw,2.2rem)] leading-tight text-[#18352a]">
                {module.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#66716a]">{module.description}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">Image Library</p>
          <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
            Visuals only
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {["Villa exterior", "Cottage exterior", "Room interiors", "Lifestyle shots"].map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-[#e9e3d4] bg-[#fbf8ef] p-5 text-[15px] font-medium text-[#18352a]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">Gallery Note</p>
          <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
            Manage only images
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#66716a]">
            Keep this section focused on gallery assets, sequence and the visuals shown on the stay pages.
          </p>
        </article>
      </section>
    </ConsoleShell>
  );
}
