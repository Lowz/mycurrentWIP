define(['knockout', 'breeze'], function (ko, breeze) {
    //setup breeze vars
    var EntityQuery = breeze.EntityQuery;
    var FilterQueryOp = breeze.FilterQueryOp;
    var manager = new breeze.EntityManager('/breeze/Dummy');

    
    //save changes func - pushes updates to DB
    var saveChanges = function () {
        if (manager.hasChanges()) {
            manager.saveChanges();
        }
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

    //replace dummy with a sensical identifier
    var getData = function (dataset, endpoint, predicates) {
        console.info('yo 1');
        var dfd = jQuery.Deferred();
        var query = EntityQuery.from(endpoint);

        var prepDataArray = function (data) {
            console.info('yo 2');
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


    //expose dataservice funcs
    var dataservice = {
        getDUMMYS: getDUMMYS,
        getTheBoy: getTheBoy,
        saveChanges: saveChanges
    };
    return dataservice;
});