using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace _2.models
{
    public class note
    {
        public int Id { get; set; }
        public string content { get; set; }

        public int ApplicationId { get; set; }
        [ForeignKey("ApplicationId")]
        public Application Application { get; set; }
    }
}