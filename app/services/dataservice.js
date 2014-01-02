define([ 'breeze'], function ( breeze) {
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

    //replace dummy with a sensical identifier
    var getDUMMYS = function (DUMMYObservable) {
        var query = EntityQuery.from('Dummys');
        //DUMMYObservable([]);
        DUMMYObservable.removeAll();

        manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);


        //functiuon which pushes data into a normal array, then afterwards pushes said normal array to oberservable array(to avoid refresh spam,
        //if dummys.push is called 100 times, the page will refresh the binding 100 times (lots of computation)
        function querySucceeded(data) {
            var DUMMYS = [];

            data.results.forEach(function (item) {
                DUMMYObservable.push(item);
            });

            console.log('DUMMY Data fetched from DB');
        }
    };


    //expose dataservice funcs
    var dataservice = {
        getDUMMYS: getDUMMYS,
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


    //#Private funcs
    function queryFailed(err, errMsg) {
        var msg = 'Error getting data. ' + errMsg;
        console.log(msg);
    }
});