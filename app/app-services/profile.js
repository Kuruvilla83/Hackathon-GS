'use strict';
/**
 * @ngdoc function
 * @name gsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gsApp
 */
angular.module('gsApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }])
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (put_url, get_url) {

		//alert("t2"+$('#file-upload')[0].files[0]);
       	$.ajax({
            method: 'PUT',
            url: put_url,
            data: $('#file-upload')[0].files[0],
            processData: false,
          }).done(function(response){
            console.log(response);
            $('#get-output').text('Upload successful. Download your file at: ' + get_url);
            $('#output-image').attr('src', get_url);
          }).fail(function(){
            console.log('FAIL');
            console.log(arguments);
          })
    }
}])  

		 
.controller("ProfileController", ['$scope', '$rootScope', '$http', 'fileUpload', '$mdDialog', '$window', function($scope, $rootScope, $http, fileUpload, $mdDialog, $window){
	var file = "";
    var uploadUrl, logoPath;
        var put_url = null;
        var get_url = null;
		$scope.uploadFile = function () {
           $.ajax({
            method: 'GET',
            url: API_ROOT+'uploads/new?access_token='+access_token
          }).done(function(response){
            put_url = response.put_url;
			//alert("t1"+put_url);
            get_url = response.public_url;            
			fileUpload.uploadFileToUrl(put_url, get_url);
          }).fail(function(){
            console.log('FAILED');
          })
        };
	
	
	$rootScope.industryId = null;
	
	$rootScope.stepTwoReady = false;
	
			$scope.industries = [{
			id: 1,
			value: "Food",
			subInd: [{
				id: 1,
				value: "Cakes/Cupcakes/Cookies"
			},{
				id: 2,
				value: "Candy"
			},{
				id: 3,
				value: "Snacks"
			},{
				id: 4,
				value: "Beverage Line"
			},{
				id: 5,
				value: "Food Truck/Food Stand"
			},{
				id: 6,
				value: "Catering"
			},{
				id: 7,
				value: "Food Processing"
			},{
				id: 8,
				value: "Other"
			}]
		},{
			id: 2,
			value: "Retail",
			subInd: [{
				id: 1,
				value: "Apparel Line"
			},{
				id: 2,
				value: "Jewelry Line"
			},{
				id: 3,
				value: "Stationery/Greeting Cards"
			},{
				id: 4,
				value: "Candles"
			},{
				id: 5,
				value: "Decorative Art"
			},{
				id: 6,
				value: "Beauty Products (Hair, Skin)"
			},{
				id: 7,
				value: "Online Retail Shop"
			},{
				id: 8,
				value: "Other"
			}]
		},{
			id: 3,
			value: "Service",
			subInd: [{
				id: 1,
				value: "Lawn Care"
			},{
				id: 2,
				value: "Dog Walking/Grooming/Pet Sitting"
			},{
				id: 3,
				value: "Tutoring"
			},{
				id: 4,
				value: "Babysitting"
			},{
				id: 5,
				value: "Tech Support"
			},{
				id: 6,
				value: "Photography/videography"
			},{
				id: 7,
				value: "DIY Classes"
			},{
				id: 8,
				value: "Food Delivery"
			},{
				id: 9,
				value: "Other"
			}]
		},{
			id: 4,
			value: "Other",
			subInd: null
		}];
	
	$scope.points = "0";
	
	$scope.SubmitBusinessIdea = function () {
		$rootScope.industryId = $scope.industry.id;
		var res = {
		   idea: $scope.idea,
		   problem: $scope.problem,
		   logo: get_url,
		   industry:$scope.industry,			
		   industryOther: $scope.industryOther,
		   subIndustry: $scope.subIndustry,		   		   
		   subIndOther: $scope.subIndOther,		   
		   description: $scope.description
		};
		pidea= $scope.idea;
		pproblem= $scope.problem;
		pfname= get_url;
		pindustry=$scope.industry;
		pindustryOther=$scope.industryOther;
		psubIndustry=$scope.subIndustry;
		psubIndOther= $scope.subIndOther;
		pdescription = $scope.description;
		
	   $http({
		method: 'POST',
		datatype: "json",
		url: 'https://ct-staging.hyfnrsx1.com/api/hackathon/saves?access_token='+access_token,
		headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		data: 'name='+$scope.name+
				'&data=' + JSON.stringify(res)
	}).success(function (data) {
		console.log(data);
		pid= data.id;
		pname = data.name;
		$scope.dialog();
		//scoringSubmit();
	});
	
	$scope.dialog = function (ev) {
		var confirm = $mdDialog.confirm({
			controller: DialogController,
			templateUrl: 'dialogtmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
		})
		$mdDialog.show(confirm).then(function(){
			$rootScope.stepNum++;
			$rootScope.stepTwoReady = true;
			$scope.expenseSetup();
		});
		
	};
	
	
	
 };
	
	
	$scope.userdata = {
		name: "",
		data: ""
	};
	
	$scope.genderOptions = ["Male", "Female", "Both"];
	$scope.ageOptions = ["Preteens", "Teens", "Adults", "All Groups"];
	$scope.locTypes = ["Virtual Location", "Physical Location", "Both"];
	$scope.competitionList = ["0-5", "6-10", "11-15", "16+"];
	
	$scope.expCatList = [{
		id: 1,
		industry: "Food",
		expList: [
			"Ingredients needed",
			"Utensils",
			"Packaging supplies",
			"Building/Space",
			"Equipment",
			"Transportation",
			"Other"
		]
	},{
		id: 2,
		industry: "Retail",
		expList: [
			"Materials",
			"Equipment",
			"Packaging supplies",
			"Building/Space",
			"Other"
		]
	},{
		id: 3,
		industry: "Service",
		expList: [
			"Supplies",
			"Equipment",
			"Building/Space",
			"Transportation",
			"Other"
		]
	}];
	
	$scope.expenseSetup = function () {
		if ($rootScope.industryId != null){
			var categoryObj = $scope.expCatList[$rootScope.industryId-1];
			var expList = categoryObj.expList;
			
			for(var i = 0; i < expList.length; i++){
				var elem = angular.element('<table class="table" id="exp'+i+'"></table>');
				var elem2 = angular.element('<thead></thead>');
				var elem3 = angular.element('<tr><th class="col-md-2">'+expList[i]+'</th></tr>');
				var elem4 = angular.element('<th style="width:10%; right: 0px"><button type="button" class="btn btn-add btn-primary">Add</button></th>');
				elem3.append(elem4);
				elem2.append(elem3);
				elem.append(elem2);
				var classString = "innerItems" + i.toString();
				elem2 = angular.element('<tbody id="'+classString+'"></tbody>');
				elem.append(elem2);
				$('.expense').append(elem);
			}
			add_handlers();
		}
	};
	
	$scope.SubmitStepTwo = function () {
		
	    
		var result = {
			idea: pidea,
			problem: pproblem,
			logo: pfname,
			industry:pindustry,			
			industryOther: pindustryOther,
			subIndustry: psubIndustry,		   		   
			subIndOther: psubIndOther,		   
			description: pdescription,
			target: $scope.target,
			gender: $scope.gender,
			age: $scope.age,
			city: $scope.city,
			state: $scope.state,
			location: $scope.locationType,
			comp: $scope.comp,
			total: $scope.total,
			website: $scope.website,
			social: $scope.social,
			marketing: $scope.marketing,
			advertise: $scope.advertise,
            expenses: getExpenses($scope)
		};	
		console.log(result);		
     
	    $http({
            method: 'PUT',
            datatype: "json",
            url: 'https://ct-staging.hyfnrsx1.com/api/hackathon/saves/'+pid+'?access_token='+access_token,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data: 'name=' + pname + 
                  '&data='+JSON.stringify(result) 
			}).success(function (data) {
				console.log(data);
				$scope.showConfirm();
				//scoringFinalSubmit();
			})

	};
	
	$scope.showConfirm = function (ev) {
		var confirm = $mdDialog.confirm()
          .title('Congratulations!')
          .textContent('You have completed step 2 of your business idea.')
          .ariaLabel('Business Plan Complete')
          .targetEvent(ev)
          .ok('Save & Exit')
		$mdDialog.show(confirm).then(function() {
		  $window.location.href = '#/home';
		});
	};
	
	function scoringSubmit() {
		$http({
		method: 'POST',
		datatype: "json",
		url: 'https://ct-staging.hyfnrsx1.com/api/hackathon/scoring?access_token='+access_token+'&event_name=step_1_complete',
		headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}		
	}).success(function (response) {
		console.log(response)
		pts = response.points_earned;		
		$("#pts").val(pts);
		})
	};
	function scoringFinalSubmit() {
		$http({
		method: 'POST',
		datatype: "json",
		url: 'https://ct-staging.hyfnrsx1.com/api/hackathon/scoring?access_token='+access_token+'&event_name=step_2_complete',
		headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	}).success(function (response) {
		console.log(response)
		})
	};
	
}])

function addExpenseRow(e) {
 var bod = $(e.target).parents('.table').find('tbody');
    var row = angular.element('<tr class="exp-row"><td><input type="text" name="item" id="item" ng-model="item" placeholder="Item/Service" /></td></tr>');
	var row2 = angular.element('<td><input onBlur="totalExp()" type="number" name="qty" id="qty" class="form-control" ng-model="qty" placeholder="Quantity"/></td>');
	var row3 = angular.element('<td><input onBlur="totalExp()" type="text" name="price" ng-model="price" class="form-control" id="price" placeholder="Price Per Unit"/></td>');
    row.append(row2);
	row.append(row3);
	bod.append(row);
}

function DialogController($scope, $mdDialog, $window){
	$scope.exit = function () {
		$mdDialog.hide();
	};
	
	$scope.continuePlan = function (pid) {
		$mdDialog.hide();
	}
}
function add_handlers() {
    $('.btn-add').each(function (i, e) {
        $(e).on('click', addExpenseRow);
    });
}
function getExpenses(scope) {
    var data = {}, cats, ind, subs, lbl, rows, row;
    cats = scope.expCatList;
    ind = pindustry.value;
    //console.log(cats);
    //console.log(cats.length);
    console.log(ind);
    for (var i=0; i<cats.length; i++) {
        if (cats[i].industry == ind) {
            subs = cats[i].expList;
            break;
        }
    }
    for (var i=0; i<subs.length; i++) {
        lbl = subs[i];
        //console.log(lbl);
        rows = $('#exp'+i).find('tbody tr');
        //console.log(rows);
        for (var z=0; z<rows.length; z++) {
            var itm, qty, amt;
            row = $(rows[z]);
            itm = row.find('#item').val();
            qty = row.find('#qty').val();
            amt = row.find('#price').val();
            //console.info(itm +' - '+qty+' * '+amt);
            if (!data[i]) {
                data[i] = [];
            }
            data[i].push(Array(itm, qty, amt));
        }
    }
    console.log(data);
    return data;
}
function totalExp () {
	var data = {}, ind, subs, rows, row, total = 0;
	var indId = $('#indId').val();
	console.info(indId);
	subs = VOCAB.industry[indId-1].expenses;
	ind = pindustry.value;
	
	//console.log(cats.length);
	console.log(ind);
	console.log(subs);
	
	for (var i=0; i<subs.length; i++) {
		
		rows = $('#exp'+i).find('tbody tr');
		//console.log(rows);
		for (var z=0; z<rows.length; z++) {
			var qty, amt, mult;
			row = $(rows[z]);
			qty = row.find('#qty').val();
			amt = row.find('#price').val();
			if (!qty || !amt){
				return;
			}
			//console.info(itm +' - '+qty+' * '+amt);
			mult = parseFloat((0+qty) * (0+amt));
			total+=mult;
		}
	}
	total = total.toFixed(2);
	$('#total').text(total);
	console.info(total);
};
var pid, pname, pidea, pproblem, pfname, pindustry, pindustryOther, psubIndustry, psubIndOther, pdescription ="";
var pts ="";