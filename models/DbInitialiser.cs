using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace _2.models
{
    public class DbInitialiser : DropCreateDatabaseAlways<MyDatabaseContext>
    {



        public static void PurgeDatabase(MyDatabaseContext context)
        {
            if (context.clients != null)
            {
                var clients = context.clients;
                foreach (var c in clients)
                {
                    clients.Remove(c);
                }

            }


            if (context.notes != null)
            {
                var notes = context.notes;
                foreach (var n in notes)
                {
                    notes.Remove(n);
                }
            }


            if (context.applications != null)
            {
                var apps = context.applications;
                foreach (var a in apps)
                {
                    apps.Remove(a);
                }

                context.SaveChanges();
            }
        }









        //funcs for seeding DB
        protected override void Seed(MyDatabaseContext context)
        {
            SeedDatabase(context);
        }
        //bulk work for seeding DB with fixed data
        public static void SeedDatabase(MyDatabaseContext context)
        {
            var time = new DateTime(2014, 1, 8);

            var apps = new Application[] {
                addApplication("SOL", time),
                addApplication("ISS", DateTime.Now.AddDays(-30)),
            };

            var notes = new note[] {
            addNote("WGARBLEGARBLEGARBLE", apps[0]),
            addNote("RABBLERABBLERABBLE", apps[1])
            };

            var clients = new client[] {
            addClient("Paul", "Finnen", apps[0]),
            addClient("John", "Connor", apps[1])
        };

            Array.ForEach(apps, a => context.applications.Add(a));
            Array.ForEach(notes, n => context.notes.Add(n));
            Array.ForEach(clients, c => context.clients.Add(c));

            var myApp = new Application();
            var myClient = new client();
            myClient.Application = myApp;
            myClient.firstName = "Garry";
            myClient.surname = "Taylor";

            myClient.Application.Status = "RES";
            context.clients.Add(myClient);

            context.SaveChanges();
        }
        //logic for adding objs by class as defined in models...
        private static client addClient(string p1, string p2, Application app1)
        {
            var client1 = new client();
            client1.firstName = p1;
            client1.surname = p2;
            client1.Application = app1;
            return client1;
        }

        private static note addNote(string p, Application app1)
        {
            var note = new note();
            note.content = p;
            note.Application = app1;
            return note;
        }

        private static Application addApplication(string p, DateTime time)
        {
            var app = new Application();
            app.Status = p;
            app.EntryDate = time;
            return app;
        }
    }
}