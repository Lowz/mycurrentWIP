using System;
using System.Data;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace _2.models
{
    public class Application
    {
        public int ApplicationId { get; set; }
        public String Status { get; set; }

        public DateTime? EntryDate { get; set; }

        public ICollection<client> Clients { get; set; }
        public ICollection<note> Notes { get; set; }

        //[Column(TypeName = "DateTime2")]
        //public DateTime EntryDate
        //{
        //    get
        //    {
        //        if (_EntryDate == null) { _EntryDate = (2014,1,8); }
        //        return _EntryDate;
        //    }
        //    set { _EntryDate = value; }
        //}
    }
}