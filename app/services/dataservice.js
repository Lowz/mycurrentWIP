define(['knockout', 'breeze'], function (ko, breeze) {
    //setup breeze vars
    var EntityQuery = breeze.EntityQuery;
    var FilterQueryOp = breeze.FilterQueryOp;
    var manager = new breeze.EntityManager('/breeze/note');
    var type;
    var isLoaded = false;

    //save changes func - pushes updates to DB
    var saveChanges = function () {
        if (manager.hasChanges()) {
            manager.saveChanges();
        }
    };

    var initDB = function () {
        var dfd = jQuery.Deferred();
        console.log('hi');
        if (isLoaded == false) {
            manager.metadataStore.fetchMetadata('breeze/note')
                .then(function (metadata) {
                    isLoaded = true;
                    dfd.resolve(manager);
                    console.log('works done on init');
                });
        };
        return dfd.promise();
    };

    var addNote = function (body) {
        var newNote = manager.createEntity('note', { content: body });
    };
    //type = manager.metadataStore.getEntityType('note');
    //manager = (manager + 'note');

    //saveChanges();


    var addClient = function (first, last) {
        //manager = manager + 'client';
        var newClient = manager.createEntity('client', { firstName: first, surname: last });
        //saveChanges();
    };

    var addClientCase = function () {
        //manager = manager + 'clientCase';
        var newClientCase = manager.createEntity('clientCase');
        //saveChanges();
    };

    //fetches all dummys off DB
    var getDUMMYS = function (dataset) {
        predicates = undefined;
        return getData(dataset, 'Dummys');
    };

    //fetches and filters dummys off DB
    var getTheBoy = function (dataset) {
        predicates = [];
        var p1 = new breeze.Predicate('firstName', '==', 'John');
        predicates = breeze.Predicate.and(p1);
        return getData(dataset, 'Dummys', predicates);
    };

    //fetches and filters dummys off DB
    var getTheGirl = function (dataset) {
        predicates = [];
        var p1 = new breeze.Predicate('firstName', '==', 'Shara');
        predicates = breeze.Predicate.and(p1);
        return getData(dataset, 'Dummys');
    };


    var getClientCases = function (dataset) {
        predicates = undefined;
        return getData(dataset, 'clientCases');
    };


    //handles fetching data (takes params)
    var getData = function (dataset, endpoint, predicates) {
        var dfd = jQuery.Deferred();
        var query = EntityQuery.from(endpoint);

        var prepDataArray = function (data) {
            dataset.removeAll();

            data.results.forEach(function (item) {
                dataset.push(item);
            });

            dfd.resolve(dataset);
        };

        if (predicates !== undefined) {
            query = query.where(predicates);
        }

        manager.executeQuery(query)
            .then(prepDataArray);

        return dfd.promise();
    };

    //var purgeDB = function () {
    //    var clients = context
    //};


    //expose dataservice funcs
    var dataservice = {
        getDUMMYS: getDUMMYS,
        getTheBoy: getTheBoy,
        saveChanges: saveChanges,
        addNote: addNote,
        addClient: addClient,
        addClientCase: addClientCase,
        initDB: initDB
    };
    return dataservice;
});