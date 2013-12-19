/*global jasmine, describe, beforeEach, it, expect, require */
//var VuT = require('viewmodels/myPage');
//var app = require('durandal/app');
//var viewLocator = require('durandal/viewLocator');
//var compo;
//var flag;
//var timeErr;

//timeErr = 'before the runs';
////first runs block starts durandals composition functions, and listens for an event which passes
////the V/VM to our test, then changes flag to true to allow the next "runs" to run

//flag = false;
//timeErr = 'before app start';
////durandal setup
//app.start().then(function () {
//	timeErr = 'after app start';
//	viewLocator.useConvention();
//	app.setRoot('../../../app/viewmodels/myPage', 'entrance');
//	timeErr = 'before app on';

//	app.on('test:compositionComplete').then(function (obj) {
//		timeErr = 'after app on';
//		compo = obj;

//		if (compo !== undefined) {
//			timeErr = 'inside the if';
//			flag = true;
//			app.off();
//		}
//	});
//});



describe('My myPage page should', function () {
	"use strict";
	/*VARS: VuT = viewmodel under test, 
    app = durandals app plugin(used to attach view to viewModel,
    viewLocator = probably not needed, used to declare standard naming conventions for views/viewmodels
    compo = object with both view and viewmodel, "composition"
    flag = used to let jasmine know it can run the last runs function when true
    timeErr = the error message displayed when timing out, used here to find where phantomjs ran up to
    */


	//waitsFor is repeatedly run till flag is true (approx 40times)
	//now we have the dom we can finally test that the DOM has got the right title. if something changes it, it will return failed test
	xit('have a title of myPage', function () {
		expect(compo.view.childNodes[1].innerHTML).toBe('myPage');

	});
});
