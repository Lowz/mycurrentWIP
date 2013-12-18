define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        //compositionComplete: function (view, parent) {
        //    app = require('durandal/app');
        //    console.log('below came from compo complete!');
        //    console.log(view, parent);
        //    app.trigger('test:compositionComplete', { view: view, viewModel: this });
        //},
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});