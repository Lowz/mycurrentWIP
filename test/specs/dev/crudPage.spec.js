/*global jasmine, describe, beforeEach, it, expect, require */

describe('My crudPage page ', function () {
    //"use strict";
    /*VARS: VuT = string path for viewmodel under test, 
    app = durandals app plugin(used to attach view to viewModel,
    viewLocator = probably not needed, used to declare standard naming conventions for views/viewmodels
    compo = object with both view and viewmodel, "composition"
    flag = used to let jasmine know it can run the last runs function when true
    timeErr = the error message displayed when timing out, used here to find where phantomjs ran up to
    */
    var ko = 'knockout';
    var app = require('durandal/app');
    var viewLocator = require('durandal/viewLocator');
    var $ = require("jquery");
    var compo;
    var flag = false;
    var timeErr;
    var dataservice = require('services/dataservice');    
    var VuT = ('../../../app/viewmodels/crudPage');
    

    var functionSpy,
        FakePromise = function (data) {
            var dfd = jQuery.Deferred();
            dfd.resolve(data);
            return dfd.promise();
        };


    //check for Q, require it if not present (small hack)
    if (window.Q === undefined) {
        require(["Q"]);
    }




    //The below is run once, as it is a beforeEach of the suites inside "My mypage should" describe block
    beforeEach(function () {
        if (flag === true) { return; }
        timeErr = 'before the runs';

        //set up spies here
        functionSpy = spyOn(dataservice, 'getApplications').andCallFake(function (data) {
            data.removeAll();
            var mockData = [
                {
                    ApplicationId: 0, EntryDate: new Date(12/11/2013), Status: 'ISS',
                    Notes: [
                     { Id: 0, ApplicationId: 0, content: 'WAGARBLE' },
                     { Id: 1, ApplicationId: 0, content: 'RABBLE' }],
                    Clients: [
                     { firstName: 'NotGarry', surname: 'Taylor', ClientId: 0, ApplicationId: 0 },
                     { firstName: 'John', surname: 'Connor', ClientId: 1, ApplicationId: 0 }]
                },
                {
                    ApplicationId: 1, EntryDate: new Date(2013 / 11 / 20), Status: 'RES',
                    Notes: [
                     { Id: 2, ApplicationId: 1, content: 'WAGARBLE' },
                     { Id: 3, ApplicationId: 1, content: 'RABBLE' }],
                    Clients: [
                     { firstName: 'Garry', surname: 'Taylor', ClientId: 2, ApplicationId: 1 },
                     { firstName: 'John', surname: 'Connor', ClientId: 3, ApplicationId: 1 }]
                }];

            data(mockData);

            var promise = new FakePromise(mockData);

            return promise;
        });
        //refresh 

        //first runs block starts durandals composition functions, and listens for an event which passes
        //the V/VM to our test, then changes flag to true to allow the next "runs" to run
        runs(function () {
            timeErr = 'before app start';
            app.start().then(function () {
                timeErr = 'after app start';
                viewLocator.useConvention();
                app.setRoot(VuT, 'entrance');
                timeErr = 'before app on';

                app.on('test:compositionComplete').then(function (obj) {
                    timeErr = 'after app on';
                    compo = obj;

                    if (compo !== undefined) {
                        timeErr = 'inside the if';
                        flag = true;
                        app.off();
                    }
                });
            });
        }, 'async');


        //waitsFor is repeatedly run till flag is true (approx 40times)
        waitsFor(function () {
            return (flag);
        }, timeErr);


        runs(function () {
            //defines Q in glob if not in glob
            if (window.Q === undefined) {
                window.Q = require("Q");
            }
            //since we just want the view/viewmodel from above code, this is empty as we need to force jasmine to wait on V/VM and 2 "runs"
            //functions is part of the syntax
        });
    });

    describe('SHOULD', function () {

        it('have a title of crudPage', function () {
            expect($('h2:first')[0].innerHTML).toBe('crudPage');
        });

        it('have items after calling load', function () {
            expect(functionSpy).toHaveBeenCalled();
        });

        it('have an item in an item', function () {
            expect($('span')[0].innerHTML).toBe('ISS');
        });

    });
});

