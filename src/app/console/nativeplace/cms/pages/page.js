import ConsoleShell from "../../ConsoleShell.jsx";
import { requireAdminSession } from "../../auth.js";
import dbConnect from "@/app/lib/dbConnect.js";
import { Banner, Page } from "@/app/lib/models/index.js";
import HomePageEditor from "../components/HomePageEditor.jsx";
import { defaultHomeContent, normalizeHomeContent } from "../utils.js";

export const metadata = {
  title: "Home Page CMS | The Native Place",
  description: "Manage homepage slider banners and intro content.",
};

async function getHomePageData() {
  try {
    await dbConnect();

    const [bannerDocs, homePageDoc] = await Promise.all([
      Banner.find({}).sort({ sortOrder: 1, createdAt: 1 }).lean(),
      Page.findOne({ slug: "home" }).lean(),
    ]);

    return {
      banners: bannerDocs || [],
      content: normalizeHomeContent(homePageDoc?.content || defaultHomeContent),
      warning: "",
    };
  } catch (error) {
    return {
      banners: [],
      content: normalizeHomeContent(defaultHomeContent),
      warning:
        "MongoDB is unavailable or authentication failed, so the Home Page editor is showing default content for now.",
      error: error?.message || "Unable to load homepage data.",
    };
  }
}

export default async function CmsHomePage() {
  await requireAdminSession("/console/nativeplace/cms/pages");
  const { banners, content, warning } = await getHomePageData();

  return (
    <ConsoleShell
      pageTitle="Home Page"
      pageDescription="Edit the homepage slider banners and the intro content shown below the banner carousel."
    >
      <HomePageEditor
        initialBanners={banners}
        initialContent={content}
        sourceWarning={warning}
      />
    </ConsoleShell>
  );
}
