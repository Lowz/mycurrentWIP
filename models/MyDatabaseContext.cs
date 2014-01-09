using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Linq;


namespace _2.models
{
    public class MyDatabaseContext : DbContext
    {
        static MyDatabaseContext()
        {
            Database.SetInitializer(new DbInitialiser());
        }
        //public MyDatabaseContext()
        //    : base("DB1") { }

        public DbSet<dummy> Dummys { get; set; }
        public DbSet<Application> applications { get; set; }
        public DbSet<client> clients { get; set; }
        public DbSet<note> notes { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Application>()
            //    .Property(a => a.EntryDate)
            //    .HasColumnType("datetime2");

            //modelBuilder.Entity<client>()
            //    .Property(c => c.firstName).HasMaxLength(20);

            modelBuilder.Entity<Application>()
                .Property(a => a.EntryDate).HasPrecision(7);
        }

    }

}