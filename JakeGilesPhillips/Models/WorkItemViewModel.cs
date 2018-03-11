using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JakeGilesPhillips.Models
{
    public class WorkItemViewModel
    {
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Date { get; set; }
        public string[] Images { get; set; }
        public string Description { get; set; }
    }
}