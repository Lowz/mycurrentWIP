define(['plugins/http', 'durandal/app', 'services/dataservice', 'knockout'], function (http, app, dataservice, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.
    var isloaded = false;

    var dummys = ko.observableArray([]);

    var pass = function (data) {
        //dummys.removeAll();
        //dummys(data());
        console.log("Passed yeahhh");
    };

    var fail = function (data) {
        console.info('You done goofed... Got ', data, ' back.');
    };


    //can include pass/fail
    var load = function () {
        if (isloaded === false) {
            //dataservice.getDUMMYS(dummys); //.then(pass, fail);
        }

        //isloaded = true;
    };

    //dataservice contains all query logic
    var save = function () {
        dataservice.saveChanges();
    };

    var getTheBoy = function () {
        dataservice.getTheBoy(dummys);
    };

    return {
        displayName: 'myPage',
        description: 'this is my page',
        dummys: dummys,
        load: load,
        save: save,
        getTheBoy: getTheBoy,
        compositionComplete: function (view, parent) {
            app = require('durandal/app');
            app.trigger('test:compositionComplete', { view: view, viewModel: this });
        },

    };
});