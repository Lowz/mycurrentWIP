define(['knockout', 'breeze'], function (ko, breeze) {
    //setup breeze vars
    //********************************************************************************************************************************
    var EntityQuery = breeze.EntityQuery;
    var FilterQueryOp = breeze.FilterQueryOp;
    var manager = new breeze.EntityManager('/breeze/App');
    var type;
    var isLoaded = false;
    //********************************************************************************************************************************
    //********************************************************************************************************************************
    //********************************************************************************************************************************
    //TEMPORARY FUNCTIONS
    var initDB = function () {
        var dfd = jQuery.Deferred();
        console.log('hi');
        if (isLoaded === false) {
            manager.metadataStore.fetchMetadata('breeze/App')
                .then(function (metadata) {
                    isLoaded = true;
                    dfd.resolve(manager);
                    console.log('works done on init');
                });
        }
        return dfd.promise();
    };

    var purge = function (callback) {
        $.post('/breeze/App/purge', function () {
            manager.clear();
            if (callback) callback();
        });
    };

    var reset = function (callback) {
        $.post('/breeze/App/reset', function () {
            manager.clear();
            if (callback) callback();
        })
    };
    //********************************************************************************************************************************
    //********************************************************************************************************************************
    //********************************************************************************************************************************
    //ADD TO DB FUNCS
    var addNote = function (cont, app) {
        var newNote = manager.createEntity('note', { content: cont, Application: app });
    };

    var addClient = function (first, last, app) {
        //manager = manager + 'client';
        var newClient = manager.createEntity('client', { firstName: first, surname: last, Application: app });
        //saveChanges();
    };

    var addApplication = function (status, date) {
        //manager = manager + 'clientCase';
        var newApplication = manager.createEntity('application', { Status: status, EntryDate: date });
        //saveChanges();
    };
    //********************************************************************************************************************************
    //********************************************************************************************************************************
    //********************************************************************************************************************************
    //GET FROM DB FUNCS
    var getApplications = function (dataset) {
        var predicates = undefined;
        expand = 'Clients';
        return getData(dataset, 'applications', predicates, expand);
    };

    var getClients = function (dataset) {
        var predicates = new breeze.Predicate('firstName', 'startswith', 'J');
        var expand = 'Application';
        return getData(dataset, 'clients', predicates, expand);
    };

    var getNotes = function (dataset) {
        var predicates = undefined;
        return getData(dataset, 'notes');
    };
    //********************************************************************************************************************************
    //AND LOGIC FOR ABOVE
    var getData = function (dataset, endpoint, predicates, expand) {
        var dfd = jQuery.Deferred();

        var prepDataArray = function (data) {
            dataset.removeAll();

            data.results.forEach(function (item) {
                dataset.push(item);
            });

            dfd.resolve(dataset);
        };

        query = buildQuery(endpoint, predicates, expand);
        manager.executeQuery(query).then(
            prepDataArray,
            function (data) {
                dfd.reject(data);
            });

        return dfd.promise();
    };

    var buildQuery = function (endpoint, predicates, expand) {
        var query = new EntityQuery.from(endpoint);

        if (predicates != undefined && expand === undefined) {
            query = query.where(predicates);
        }

        if (expand != undefined && predicates === undefined) {
            var query = query.expand(expand);
        }//STOP! AM I PAPAING THIS? it does make it a lot more readable...

        if (expand != undefined && predicates != undefined) {
            var query = query.where(predicates).expand(expand);
        }

        return query;
    };
    //********************************************************************************************************************************
    //********************************************************************************************************************************
    //********************************************************************************************************************************
    //expose methods and savechanges method
    

    //save changes func - pushes updates to DB
    var saveChanges = function () {
        if (manager.hasChanges()) {
            manager.saveChanges();
        }
    };

    //expose dataservice funcs
    var dataservice = {
        saveChanges: saveChanges,
        addNote: addNote,
        addClient: addClient,
        addApplication: addApplication,
        initDB: initDB,
        purge: purge,
        reset: reset,
        getApplications: getApplications,
        getNotes: getNotes,
        getClients: getClients,
        buildQuery: buildQuery
    };
    return dataservice;
});