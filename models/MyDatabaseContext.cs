using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;


namespace _2.models
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext()
            : base("DB1") { }

        public DbSet<dummy> Dummys { get; set; }
        public DbSet<clientCase> clientCases { get; set; }        
        public DbSet<client> clients { get; set; }
        public DbSet<note> notes { get; set; }
        
    }


}