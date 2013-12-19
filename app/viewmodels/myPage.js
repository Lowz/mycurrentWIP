define(['plugins/http', 'durandal/app'], function (http, app) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: 'myPage',
        description: 'this is my page',
        features: ['stuff', 'more stuff', 'chock loads of stuff'],
        compositionComplete: function (view, parent) {
            app = require('durandal/app');
            app.trigger('test:compositionComplete', { view: view, viewModel: this });
        }
    };
});