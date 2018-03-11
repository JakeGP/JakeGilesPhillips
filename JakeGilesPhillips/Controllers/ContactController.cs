using System;
using JakeGilesPhillips.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.Mvc;
using System.Web.Helpers;
using System.Net;
using System.Net.Mail;

namespace JakeGilesPhillips.Controllers
{
    public class ContactController : Controller
    {
        // GET: Contact
        public ActionResult Index()
        {
            return View("Contact", "_ContactLayout");
        }

        public ActionResult SendEmail(string from, string name, string body)
        {
            string receiver = ConfigurationManager.AppSettings["WebMailUserDetails"].Split('|')[1];

            MailMessage newMessage = new MailMessage();
            newMessage.BodyEncoding = System.Text.Encoding.UTF8;
            newMessage.From = new MailAddress(from);
            newMessage.To.Add(new MailAddress(receiver));
            newMessage.Subject = "New Message From: " + name;
            newMessage.Body = body;

            string host = ConfigurationManager.AppSettings["WebMailHostDetails"].Split('|')[0];
            int port = int.Parse(ConfigurationManager.AppSettings["WebMailHostDetails"].Split('|')[1]);

            SmtpClient client = new SmtpClient(host, port);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = false;
            client.UseDefaultCredentials = true;       

            try
            {
                //WebMail.SmtpServer = "smtp.gmail.com";
                //WebMail.SmtpPort = 587;
                //WebMail.SmtpUseDefaultCredentials = true;
                //WebMail.EnableSsl = true;
                //WebMail.UserName = "jakegilesphillips@gmail.com";
                //WebMail.Password = "ilovemw2";
                //WebMail.From = from;

                //string Subject = "New Message From: " + name;

                //WebMail.Send(WebMail.UserName, Subject, body);
                client.Send(newMessage);

                return Content("Message Sent Successfully");
            }
            catch (Exception ex)
            {
                return Content("Problem sending message | Error: " + ex.Message + "-" + ex.InnerException + "-" + ex.Source);
            }
        }
    }
}