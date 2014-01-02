using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;


namespace _2.models
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext()
            : base("Database1") { }

        public DbSet<dummy> Dummys { get; set; }
    }


}