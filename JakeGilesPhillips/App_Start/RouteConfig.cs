using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace JakeGilesPhillips
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Home",
                url: "Home",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "About",
                url: "About",
                defaults: new { controller = "About", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "GetCV",
                url: "GetCV",
                defaults: new { controller = "About", action = "GetCV", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Blog",
                url: "Blog",
                defaults: new { controller = "Blog", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Contact",
                url: "Contact",
                defaults: new { controller = "Contact", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "GetWorkItem",
                url: "Home/WorkItem",
                defaults: new { controller = "Home", action = "WorkItem", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "ContactForm",
                url: "Contact/SendEmail",
                defaults: new { controller = "Contact", action = "SendEmail", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Sitemap",
                url: "Sitemap",
                defaults: new { controller = "Home", action = "Sitemap", id = UrlParameter.Optional }
            );
        }
    }
}
