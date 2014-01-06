define(['plugins/http', 'durandal/app', 'services/dataservice', 'knockout'], function (http, app, dataservice, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.
    var isloaded = false;
    //var note1 = 'asdfasdfasdfasdfasdfasdf asdfasdfasdfasdfasdf';
    //var note2 = 'fdsafdsafdsafdsa fdsafdsafdsafdsafdsa';
    //var client1 = { firstName: 'Paul', lastName: 'Finnen' }
    //var client2 = { firstName: 'John', lastName: 'Connors' }

    var clientCases = ko.observable;
    clientCases.notes = ko.observableArray([]);
    clientCases.clients = ko.observableArray([]);

    var pass = function (data) {
        //dummys.removeAll();
        //dummys(data());
        console.log("Passed yeahhh");
    };

    var fail = function (data) {
        console.info('You done goofed... Got ', data, ' back.');
    };

    var setup = function () {
        initDB().then(function (data) {
            addNote('asdfasdfasdfasdfasdfasdf asdfasdfasdfasdfasdf');
            addNote('fdsafdsafdsafdsa fdsafdsafdsafdsafdsa');
            addClient('Paul', 'Finnen');
            addClient('John', 'Connors');
            addClientCase();
            save();
        });
    };
    //can include pass/fail
    var load = function () {
        if (isloaded === false) {
            dataservice.getClientCases(clientCases); //.then(pass, fail);
        }

        //isloaded = true;
    };

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

    var addClientCase = function () {
        return dataservice.addClientCase();
    };
    
    var initDB = function () {
        return dataservice.initDB();
    };

    return {
        displayName: 'crudPage',
        description: 'this is my CRUD page',
        clientCases: clientCases,
        addNote: addNote,
        addClient: addClient,
        addClientCase: addClientCase,
        load: load,
        save: save,
        setup: setup,
        initDB: initDB,

        compositionComplete: function (view, parent) {
            app = require('durandal/app');
            app.trigger('test:compositionComplete', { view: view, viewModel: this });
        },

    };
});