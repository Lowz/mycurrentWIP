define(['plugins/http', 'durandal/app', 'services/dataservice', 'knockout'], function (http, app, dataservice, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    //*****************************************************VARS***********************************************************************
    var isloaded = false;
    var clients = ko.observableArray([]);
    var notes = ko.observableArray([]);
    var applications = ko.observableArray([]);
    var results = ko.observableArray([]);



    //********************************************************************************************************************************
    //*********************************************************TEMP FUNCTIONS*********************************************************
    //********************************************************************************************************************************
    //TEMPORARY FUNCTIONS
    var reset = function () {
        return dataservice.reset();
    };

    var purge = function () {
        dataservice.purge(getApplications);
        dataservice.purge(getClients);
        dataservice.purge(getNotes);
    };



    //********************************************************************************************************************************
    //*************************************************************ADD FUNCS**********************************************************
    //********************************************************************************************************************************
    //ADD TO DB FUNCS
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



    //********************************************************************************************************************************
    //**************************************************************GET FUNCS*********************************************************
    //********************************************************************************************************************************
    //GET FROM DB FUNCS
    var pass = function (data) {
        console.log(applications()[0]);
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
    };

    var getNotes = function () {
        dataservice.getNotes(notes);
    };

    var getApplications = function () {
        return dataservice.getApplications(applications);
    };



    //********************************************************************************************************************************
    //**************************************************************SAVE AND EXPOSE***************************************************
    //********************************************************************************************************************************
    //expose methods and savechanges method
    //dataservice contains all query logic
    var save = function () {
        dataservice.saveChanges();
    };

    return {
        displayName: 'crudPage',
        description: 'this is my CRUD page',
        clients: clients,
        applications: applications,
        purge: purge,
        reset: reset,
        getClients: getClients,
        getNotes: getNotes,
        getApplications: getApplications,
        initDb: initDb,
        addNote: addNote,
        addClient: addClient,
        addApplication: addApplication,
        load: load,
        save: save,

        compositionComplete: function (view, parent) {
            app = require('durandal/app');
            load();
            app.trigger('test:compositionComplete', { view: view, viewModel: this });
        },

    };
});