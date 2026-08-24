import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";
import dbConnect from "@/app/lib/dbConnect.js";
import { Page } from "@/app/lib/models/index.js";
import AboutPageEditor from "../components/AboutPageEditor.jsx";
import { defaultAboutContent, normalizeAboutContent } from "../utils.js";

export const metadata = {
  title: "About Us CMS | The Native Place",
  description: "Manage About Us content, vision and mission.",
};

async function getAboutPageData() {
  try {
    await dbConnect();

    const aboutPageDoc = await Page.findOne({ slug: "about" }).lean();

    return {
      content: normalizeAboutContent(aboutPageDoc?.content || defaultAboutContent),
      warning: "",
    };
  } catch (error) {
    return {
      content: normalizeAboutContent(defaultAboutContent),
      warning:
        "MongoDB is unavailable or authentication failed, so the About Us editor is showing default content for now.",
      error: error?.message || "Unable to load about data.",
    };
  }
}

export default async function CmsAboutPage() {
  await requireAdminSession("/console/nativeplace/cms/about");
  const { content, warning } = await getAboutPageData();

  return (
    <ConsoleShell
      pageTitle="About Us"
      pageDescription="Edit the About Us story, vision and mission copy used on the website."
    >
      <AboutPageEditor initialContent={content} sourceWarning={warning} />
    </ConsoleShell>
  );
}
