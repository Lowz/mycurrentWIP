using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace _2.models
{
    public class client
    {
        public int ClientId { get; set; }
        public string firstName { get; set; }
        public string surname { get; set; }

        public int ApplicationId { get; set; }

        [ForeignKey("ApplicationId")]
        public Application Application { get; set; }
    }

}