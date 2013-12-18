/*global jasmine, describe, beforeEach, it, expect, require */
describe('viewmodels/welcome', function () {
    "use strict";
    requirejs.config({
        baseUrl: '/app'
    });

    var Welcome = require('viewmodels/welcome');
    var app = require('durandal/app');
    var viewLocator = require('durandal/viewLocator');
    var compo;
    var flag;

    it('should have a dom', function () {

        runs(function () {
            flag = false;
            app.start().then(function () {
                //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
                //Look for partial views in a 'views' folder in the root.
                viewLocator.useConvention();

                //Show the app by setting the root view model for our application with a transition.
                app.setRoot('../../../app/viewmodels/welcome', 'entrance');
                app.on('test:compositionComplete').then(function (obj) {
                    compo = obj;
                    if (compo !== undefined) {
                        flag = true;
                        app.off();
                    }
                });
            });
        }, 'async');

        waitsFor(function () {
            return flag;
        }, 'compo didnt come back :(');

        runs(function () {
            expect(compo.view.childNodes[1].innerHTML).toBe('not correct');
        });
    });
});

