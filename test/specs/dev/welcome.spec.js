/*global jasmine, describe, beforeEach, it, expect, require */
describe('viewmodels/welcome', function () {
    "use strict";
    //requirejs.config({
    //    baseUrl: '/app'
    //});

    var Welcome = require('viewmodels/welcome');
    var app = require('durandal/app');
    var viewLocator = require('durandal/viewLocator');
    var compo;
    var flag;
    var fuckupfind;

    it('should have a dom', function () {
        fuckupfind = 'before the runs';
        runs(function () {
            flag = false;
            fuckupfind = 'before app start';
            app.start().then(function () {
                fuckupfind = 'after app start';
                //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
                //Look for partial views in a 'views' folder in the root.
                viewLocator.useConvention();

                //Show the app by setting the root view model for our application with a transition.
                app.setRoot('../../../app/viewmodels/welcome', 'entrance');
                fuckupfind = 'before app on';
                app.on('test:compositionComplete').then(function (obj) {
                    fuckupfind = 'after app on';
                    compo = obj;
                    if (compo !== undefined) {
                        fuckupfind = 'inside the if';
                        flag = true;
                        app.off();
                    }
                });
            });
        }, 'async');

        waitsFor(function () {
            return flag;
        }, fuckupfind);

        runs(function () {
            expect(compo.view.childNodes[1].innerHTML).toBe('hello?');
        });
    });
});

