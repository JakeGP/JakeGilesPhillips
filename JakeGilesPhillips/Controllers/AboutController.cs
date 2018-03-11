using System;
using System.Net.Mime;
using System.Web.Mvc;

namespace JakeGilesPhillips.Controllers
{
    public class AboutController : Controller
    {
        // GET: About
        public ActionResult Index()
        {
            return View("About", "_AboutLayout");
        }

        public ActionResult GetCV()
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + "Content\\Files\\Documents\\";
            string fileName = "Jake Giles-Phillips - CV.pdf";
            byte[] fileBytes = System.IO.File.ReadAllBytes(path + fileName);
            return File(fileBytes, MediaTypeNames.Application.Octet, fileName);
        }
    }
}