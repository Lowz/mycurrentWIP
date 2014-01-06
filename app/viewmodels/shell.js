define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title: 'Welcome', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'myPage', title: 'My Page', moduleId: 'viewmodels/myPage', nav: true },
                { route: 'crudPage', title: 'My  CRUD Page', moduleId: 'viewmodels/crudPage', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});