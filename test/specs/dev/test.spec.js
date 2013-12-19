/*global jasmine, describe, beforeEach, it, expect, require */

describe('My myPage page should', function () {
    "use strict";
    /*VARS: VuT = string path for viewmodel under test, 
    app = durandals app plugin(used to attach view to viewModel,
    viewLocator = probably not needed, used to declare standard naming conventions for views/viewmodels
    compo = object with both view and viewmodel, "composition"
    flag = used to let jasmine know it can run the last runs function when true
    timeErr = the error message displayed when timing out, used here to find where phantomjs ran up to
    */
    var VuT = ('../../../app/viewmodels/myPage');
    var app = require('durandal/app');
    var viewLocator = require('durandal/viewLocator');
    var compo;
    var flag = false;
    var timeErr;

    //The below is run once, as it is a beforeEach of the suites inside "My mypage should" describe block
    beforeEach(function () {
        timeErr = 'before the runs';
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
            return flag;
        }, timeErr);

        runs(function () {
            //since we just want the view/viewmodel from above code, this is empty as we need to force jasmine to wait on V/VM and 2 "runs"
            //functions is part of the syntax
        });
    });

    describe('squirrel', function () {

        it('have a title of myPage', function () {
            expect(compo.view.childNodes[1].innerHTML).toBe('myPage!');
        });

        it('test1', function () {
            expect(1).toEqual(1);
        });

        it('test2', function () {
            expect(1).toEqual(1);
        });

        it('test3', function () {
            expect(2).toEqual(1);
        });

        it('test4', function () {
            expect(1).toEqual(1);
        });

        it('test5', function () {
            expect(1).toEqual(1);
        });
    });
});

