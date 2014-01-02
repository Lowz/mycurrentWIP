define(['plugins/http', 'durandal/app',  'services/dataservice', 'knockout'], function (http, app, dataservice, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.
    var isloaded = false;

    var dummys = ko.observableArray([]);

    var load = function () {
        if (isloaded === false) {
            dataservice.getDUMMYS(dummys);
        }

        //isloaded = true;
    };

    var save = function () {
        dataservice.saveChanges();
    };

    return {
        displayName: 'myPage',
        description: 'this is my page',
        dummys: dummys,
        load: load,
        save: save,
        compositionComplete: function (view, parent) {
            app = require('durandal/app');
            app.trigger('test:compositionComplete', { view: view, viewModel: this });
        },

    };
});