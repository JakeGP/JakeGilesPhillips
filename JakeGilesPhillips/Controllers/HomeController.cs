using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JakeGilesPhillips.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Sitemap()
        {
            return View("~/Views/Resources/Sitemap.cshtml", "_SmallLayout");
        }

        public ActionResult WorkItem(string category, string name)
        {
            string view = "~/Views/Work/" + category + "/" + name + ".cshtml";
            return PartialView(view);
        }
    }
}