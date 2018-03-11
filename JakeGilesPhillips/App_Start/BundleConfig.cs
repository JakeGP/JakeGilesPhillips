using System.Web;
using System.Web.Optimization;

namespace JakeGilesPhillips
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/ExternalScripts/jquery-1.10.2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/ExternalScripts/jquery.validate.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/ExternalScripts/modernizr-2.6.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                        "~/Scripts/three.js-master/three.js-master/build/three.js",
                        "~/Scripts/LocalScripts/common.js",
                        "~/Scripts/LocalScripts/Gallery.js",
                        "~/Scripts/LocalScripts/OBJLoader.js",
                        "~/Scripts/LocalScripts/MTLLoader.js",
                        "~/Scripts/LocalScripts/DDSLoader.js",
                        "~/Scripts/LocalScripts/OrbitControls.js",
                        "~/Scripts/LocalScripts/TileLinks.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/CSS/Headers/PrimaryHeader.css",
                        "~/Content/CSS/Headers/SecondaryHeader.css",
                        "~/Content/CSS/Footer/Footer.css",
                        "~/Content/CSS/Home/Index.css",
                        "~/Content/CSS/Menu/PopupMenu.css",
                        "~/Content/CSS/Shared/Flex.css",
                        "~/Content/CSS/Shared/ResponsiveCSS.css",
                        "~/Content/CSS/Shared/Shared.css",
                        "~/Content/CSS/Shared/Site.css",
                        "~/Content/CSS/Work/WorkItem.css",
                        "~/Content/CSS/Work/Gallery.css"));

            bundles.Add(new StyleBundle("~/Content/blogcss").Include(
                        "~/Content/CSS/Headers/PrimaryHeader.css",
                        "~/Content/CSS/Blog/Blog.css",
                        "~/Content/CSS/Menu/PopupMenu.css",
                        "~/Content/CSS/Shared/Flex.css",
                        "~/Content/CSS/Shared/ResponsiveCSS.css",
                        "~/Content/CSS/Shared/Shared.css",
                        "~/Content/CSS/Shared/Site.css"));

            bundles.Add(new StyleBundle("~/Content/aboutcss").Include(
                        "~/Content/CSS/Headers/PrimaryHeader.css",
                        "~/Content/CSS/About/About.css",
                        "~/Content/CSS/Menu/PopupMenu.css",
                        "~/Content/CSS/Shared/Flex.css",
                        "~/Content/CSS/Shared/ResponsiveCSS.css",
                        "~/Content/CSS/Shared/Shared.css",
                        "~/Content/CSS/Shared/Site.css"));

            bundles.Add(new StyleBundle("~/Content/contactcss").Include(
                        "~/Content/CSS/Headers/PrimaryHeader.css",
                        "~/Content/CSS/Home/Contact.css",
                        "~/Content/CSS/Menu/PopupMenu.css",
                        "~/Content/CSS/Shared/Flex.css",
                        "~/Content/CSS/Shared/ResponsiveCSS.css",
                        "~/Content/CSS/Shared/Shared.css",
                        "~/Content/CSS/Shared/Site.css"));
        }
    }
}
