import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";
import dbConnect from "@/app/lib/dbConnect.js";
import { Page } from "@/app/lib/models/index.js";
import { getDefaultStayContent, normalizeStayContent } from "@/app/lib/stay-content.js";
import VillasCottagesEditor from "../components/VillasCottagesEditor.jsx";

export const metadata = {
  title: "Villas & Cottages CMS | The Native Place",
  description: "Manage gallery images for villas and cottages.",
};

async function getStayPageData(slug) {
  try {
    await dbConnect();
    const page = await Page.findOne({ slug }).lean();

    return normalizeStayContent(slug, page?.content || getDefaultStayContent(slug));
  } catch (_error) {
    return getDefaultStayContent(slug);
  }
}

export default async function CmsVillasCottagesPage() {
  await requireAdminSession("/console/nativeplace/cms/villas-cottages");

  const [villasContent, cottagesContent] = await Promise.all([
    getStayPageData("villas"),
    getStayPageData("cottages"),
  ]);

  return (
    <ConsoleShell
      pageTitle="Villas & Cottages"
      pageDescription="Manage Cloudinary image assets for villas and cottages from one place."
    >
      <VillasCottagesEditor initialVillas={villasContent} initialCottages={cottagesContent} />
    </ConsoleShell>
  );
}
