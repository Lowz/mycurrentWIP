define(['knockout', 'breeze'], function (ko, breeze) {
    //setup breeze vars
    var EntityQuery = breeze.EntityQuery;
    var FilterQueryOp = breeze.FilterQueryOp;
    var manager = new breeze.EntityManager('/breeze/Dummy');

    //define the var or predicates for filtering data

    var saveChanges = function () {
        if (manager.hasChanges()) {
            manager.saveChanges();
        }
    };

    var getDUMMYS = function (dataset) {
        predicates = undefined;
        return getData(dataset, 'Dummys');
    };

    var getTheBoy = function (dataset) {
        predicates = [];
        var p1 = new breeze.Predicate('firstName', '==', 'John');
        predicates = breeze.Predicate.and(p1);
        return getData(dataset, 'Dummys', predicates);
    };

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


    /**
    var DUMMYObsObj = function(dto) {
        return mapToObservable(dto);
    };

    function mapToObservable(dto) {
        var mapped = {};
        for (prop in dto) {
            if (dto.hasOwnProperty(prop)) {
                mapped[prop] = ko.observable(dto[prop]);
            }
        }
        return mapped;
    };
    */
});