using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _2.models
{
    public class clientCase
    {
        public int Id { get; set; }
        public client[] clients { get; set; }
        public note[] notes { get; set; }
    }
}