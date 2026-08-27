import { FileText, Image, LayoutDashboard, Sparkles, Users } from "lucide-react";
import ConsoleShell from "../ConsoleShell.jsx";
import { requireAdminSession } from "../auth.js";

export const metadata = {
  title: "CMS | The Native Place",
  description: "Manage home content, about content, blogs and stay galleries.",
};

const cmsCards = [
  {
    title: "Home Page",
    description: "Edit slider banners and the homepage intro content.",
    icon: LayoutDashboard,
  },
  {
    title: "About Us",
    description: "Manage story content, vision and mission blocks.",
    icon: FileText,
  },
  {
    title: "Blogs",
    description: "Create featured posts and updates.",
    icon: FileText,
  },
  {
    title: "Testimonials",
    description: "Manage guest reviews and live testimonials.",
    icon: Users,
  },
  {
    title: "Villas & Cottages",
    description: "Manage gallery images and stay visuals.",
    icon: Image,
  },
];

export default async function CmsOverviewPage() {
  await requireAdminSession("/console/nativeplace/cms");

  return (
    <ConsoleShell
      pageTitle="CMS"
      pageDescription="Organize the home page, about content, blog posts and stay galleries from one place."
    >
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cmsCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]">
                  <Icon className="h-5 w-5" />
                </span>
                <Sparkles className="h-4 w-4 text-[#b8c095]" />
              </div>
              <h3 className="mt-5 font-heading text-[clamp(1.6rem,2vw,2.2rem)] leading-tight text-[#18352a]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#66716a]">{card.description}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
            CMS Shortcuts
          </p>
          <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
            Content modules ready to manage
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {["Homepage banners", "About vision & mission", "Blog feature cards", "Guest testimonials", "Villa image galleries"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-[#e9e3d4] bg-[#fbf8ef] p-5 text-[15px] font-medium text-[#18352a]"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </article>

        <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">CMS Status</p>
          <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
            Ready for updates
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#66716a]">
            Home Page includes slider banners and intro content, About Us includes story, vision and mission, Blogs handles live posts, Testimonials manages guest reviews, and Villas & Cottages focuses on images.
          </p>
        </article>
      </section>
    </ConsoleShell>
  );
}
