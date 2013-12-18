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
    var shell = require('viewmodels/shell');

    it('should have a dom', function () {

        runs(function () {
            flag = false
            app.start().then(function () {
                //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
                //Look for partial views in a 'views' folder in the root.
                viewLocator.useConvention();

                //Show the app by setting the root view model for our application with a transition.
                app.setRoot('../../../app/viewmodels/welcome', 'entrance')
                app.on('test:compositionComplete').then(function (obj) {
                    compo = obj;
                    if (compo != undefined) {
                        flag = true;
                    }
                });
            });
        });

        waitsFor(function () {
            console.log(flag);
            return flag;
        }, 'compo didnt come back :(', 10000);

        runs(function () {
            console.log(compo.view.childNodes[1].innerHTML);
            expect(compo.view.childNodes[1].innerHTML).toBe('not correct');
        });
    });
});

//.toEqual('Welcome to the Durandal Starter Kit!')
//it('should be a constructor function', function() {
//    var a = new Welcome();
//    expect(a.constructor).toEqual(Welcome);
//});

//describe('instance', function() {
//    var a = new Welcome();

//    it('should have a "displayName" property', function() {
//        expect(a.displayName).toBeDefined();
//    });

//    it('should have a "description" property', function() {
//        expect(a.description).toBeDefined();
//    });

//    it('should have a "features" property', function() {
//        expect(a.features).toBeDefined();
//    });

//it('features should be of type Array', function () {
//    var a = new Welcome();
//    expect(a.features.length).toBeDefined();
//});
//});