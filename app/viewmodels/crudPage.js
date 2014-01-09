define(['plugins/http', 'durandal/app', 'services/dataservice', 'knockout'], function (http, app, dataservice, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.
    var isloaded = false;
    var clients = ko.observableArray([]);
    var notes = ko.observableArray([]);
    var applications = ko.observableArray([]);
    var results = ko.observableArray([]);
    //initDb();
    //reset();


    var pass = function (data) {
        //dummys.removeAll();
        //dummys(data());
        console.log(clients);
    };

    var fail = function (data) {
        console.info('You done goofed... Got ', data, ' back.');
    };

    //can include pass/fail
    var load = function () {
        if (isloaded === false) {
            getApplications().then(pass, fail);
        }

        //isloaded = true;
    };

    var getClients = function () {
        dataservice.getClients(clients);
        //var manager = new breeze.EntityManager('/breeze/App');

        //var query = new breeze.EntityQuery()
        //    .from("Clients")
        //    .expand("Application");

        //manager.executeQuery(query).then(function (data) {
        //    clients.removeAll();
        //    clients(data.results);
        //}).fail(function (e) {
        //    alert(e);
        //});

    }

    var getNotes = function () {
        dataservice.getNotes(notes);
    }

    var getApplications = function () {
        return dataservice.getApplications(applications);
    }

    //dataservice contains all query logic
    var save = function () {
        dataservice.saveChanges();
    };

    var addNote = function (body) {
        return dataservice.addNote(body);
    };

    var addClient = function (first, last) {
        return dataservice.addClient(first, last);
    };

    var addApplication = function () {
        return dataservice.addApplication();
    };

    var initDb = function () {
        return dataservice.initDB();
    };

    var reset = function () {
        return dataservice.reset()
    };

    var purge = function () {
        dataservice.purge(getApplications);
        dataservice.purge(getClients);
        dataservice.purge(getNotes);
    };

    return {
        displayName: 'crudPage',
        description: 'this is my CRUD page',
        addNote: addNote,
        addClient: addClient,
        addApplication: addApplication,
        load: load,
        getClients: getClients,
        getNotes: getNotes,
        getApplications: getApplications,
        //save: save,
        //setup: setup,
        initDb: initDb,
        purge: purge,
        reset: reset,
        save: save,
        clients: clients,
        applications: applications,

        compositionComplete: function (view, parent) {
            app = require('durandal/app');
            app.trigger('test:compositionComplete', { view: view, viewModel: this });
        },

    };
});