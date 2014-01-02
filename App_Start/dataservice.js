define(function() {

    //replace dummy with a sensical identifier

    var getDUMMYS = function(DUMMYObservable){
        DUMMYObservable([]);


        //setup ajax call options.replace dummy with path to 
        var options = {
            url: '/DUMMY/DUMMY',
            type: 'GET',
            dataType: 'json'
        };

        return $.ajax(options).then(querySucceeded);


        //functiuon which pushes data into a normal array, then afterwards pushes said normal array to oberservable array(to avoid refresh spam,
        //if dummys.push is called 100 times, the page will refresh the binding 100 times (lots of computation)
        function querySucceeded(data) {
            var DUMMYS = [];
            data.forEach(function (item) {
                DUMMYS.push(item);
            });
            DUMMYObservable(DUMMYS);
        };
    };
});