'use strict';
var VOCAB = {
    industry: [{
        name: 'Food',
        subs: [],
        expenses: [
			"Ingredients needed",
			"Utensils",
			"Packaging supplies",
			"Building/Space",
			"Equipment",
			"Transportation",
			"Other"
		]
    },{
        name: 'Retail',
        subs: [],
        expenses: [
			"Materials",
			"Equipment",
			"Packaging supplies",
			"Building/Space",
			"Other"
		]
    },{
        name: 'Service',
        subs: [],
        expenses: [
			"Supplies",
			"Equipment",
			"Building/Space",
			"Transportation",
			"Other"
		]
    }]
}


/**
 * @ngdoc function
 * @name gsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gsApp
 */
angular.module('gsApp')

.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma',
        'ngMdIcons'
    ];
})
 
.controller("LoginShowCtrl", function($scope) {
    if (!access_token){
         $scope.goCats = true;
         $scope.goDogs = false;	 
    } else {
        $scope.goCats = false;
        $scope.goDogs = true;	
    }
})
      
.controller("gridListDemoCtrl", function($scope, $http) {

    function isArray(value) {
        if (value) {
            if (typeof value === 'object') {
                return (Object.prototype.toString.call(value) == '[object Array]')
            }
        }
        return false;
    }  
    var buss, items, det = [];
    var id, name, idea, problem, industry, subCat, logo, desc, subOtherCat, otherindustry;
    $scope.load = function () {        
        $http.get('https://ct-staging.hyfnrsx1.com/api/hackathon/saves?access_token='+ access_token)
        .success(function (data) {
        $scope.buss = data;	
            console.log(data)		
        });
        return buss;			
    };
	$scope.remove = function(item) {
		var index = $scope.buss.indexOf(item);		
		$scope.buss.splice(index, 1)    
	}
	$scope.detailTask = function(taskId){
		$scope.hdetail = true;
            $scope.items = $scope.buss[taskId];			
            $scope.name = $scope.items.name;			
            id = $scope.items.id;
            if ($scope.items.data) {                			
                var dta = ($scope.items.data);					
                if(dta.indexOf("{") > -1 ) {
					dta = JSON.parse(dta);					
					$scope.idea = dta.idea;
					$scope.problem = dta.problem;
					//$('.logo').attr('src', dta.logo);	
					$scope.logo= dta.logo;
					if ($scope.logo != null || $scope.logo != ""){
						$scope.logo= dta.logo;						 
					} else {
						$scope.logo= "icons/def_logo.jpg";							
					}                    
					$scope.description = dta.description;
					$scope.target = dta.target;
					$scope.gender = dta.gender;
					$scope.age = dta.age;
					$scope.city = dta.city;
					$scope.state = dta.state;
					$scope.location = dta.location;
					$scope.comp = dta.comp;
					$scope.expense_rows = setExpenses(dta);
					$scope.total = getTotal(dta);
					$scope.website = dta.website;
					$scope.social = dta.social;
					$scope.marketing = dta.marketing;
					$scope.advertise = dta.advertise;
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
					$scope.genderOptions = ["Male", "Female", "Both"];
					$scope.ageOptions = ["Preteens", "Teens", "Adults", "All Groups"];
					$scope.locTypes = ["Virtual Location", "Physical Location", "Both"];
					$scope.competitionList = ["0-5", "6-10", "11-15", "16+"];
				
				var r, s;
				if (dta.industry.value == "Other"){
					dta.otherindustry = dta.otherindustry.replace(/\"/g, '');
					$scope.industry = dta.otherindustry;
				} else {
					//dta.industry = dta.industry.replace(/\"/g, '');					
					r = dta.industry.id;
					r=r-1;					
					$scope.industry = $scope.industries[r];
					$scope.deindustry = dta.industry.value;					
				}
				if (dta.subIndustry.value == "Other"){					
					dta.subIndOther = dta.subIndOther.replace(/\"/g, '');					
					s = dta.subIndustry.id;
					s=s-1;
					$scope.subcategory = $scope.industries[r].subInd[s];					
					$scope.subIndOther = dta.subIndOther;
					$scope.desubcategory = "Other / "+ dta.subIndOther;					
				} else {					
					s = dta.subIndustry.id;
					s=s-1;						
					$scope.subcategory = $scope.industries[r].subInd[s];
					$scope.desubcategory = dta.subIndustry.value;					
					}
                }
            }	
    };
	$scope.openEdit = function(taskId){
        $scope.visible = true;
        $scope.sedit = true;
        $scope.hdetail = false; 				
    };
     $scope.cancelEdit = function(){			
        $scope.sedit = false;
        $scope.hdetail = true;	
    };
	 $scope.printPage = function(){
		var printContents = document.getElementById("printthis").innerHTML;
		var popupWin = window.open('', '_blank', 'width=800,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=50');
		popupWin.window.focus();
		popupWin.document.open();
		popupWin.document.write('<!DOCTYPE html><html><head><title>TITLE OF THE PRINT OUT</title>' +
			'<link rel="stylesheet" type="text/css" href="app/directory/file.css" />' +
			'</head><body onload="window.print(); window.close();"><div>' + printContents + '</div></html>');
		popupWin.document.close();
		};
})

.controller("editController",['$scope', '$http', 'fileUpload', function($scope, $http, fileUpload){
	var put_url = null;
	var get_url = null;
	$scope.EditUploadFile = function () {
	   $.ajax({
		method: 'GET',
		url: API_ROOT+'uploads/new?access_token='+access_token
	  }).done(function(response){
		put_url = response.put_url;
		
		get_url = response.public_url;            
		$scope.uploadEditFileToUrl(put_url, get_url);
	  }).fail(function(){
		console.log('FAILED');
	  })
	};	
	$scope.uploadEditFileToUrl = function (put_url, get_url) {		
		
       	$.ajax({
            method: 'PUT',
            url: put_url,
            data: $scope.logo,
            processData: false,
          }).done(function(response){
            console.log(response);			
            $('.edit_logo').attr('src', get_url);			
          }).fail(function(){
            console.log('FAIL');
            console.log(arguments);
          })
	};
    
    $scope.editBusinessIdea = function (taskId) {
        $scope.sedit = true; 
		//alert($scope.logo +"  "+ get_url);
		var res = {
		    idea: $scope.idea,
		    problem: $scope.problem,
		    logo: get_url,
		    industry: $scope.industry,
		    industryOther: $scope.industryOther,
		    subIndustry: $scope.subcategory,	
		    subIndOther: $scope.subIndOther,		   
		    description: $scope.description,
		    target: $scope.target,
			gender: $scope.gender,
			age: $scope.age,
			city: $scope.city,
			state: $scope.state,
			location: $scope.location,
			comp: $scope.comp,			
			website: $scope.website,
			social: $scope.social,
			marketing: $scope.marketing,
			advertise: $scope.advertise
		};      
	console.log(res);
		    
        $http({
            method: 'PUT',
            datatype: "json",
            url: 'https://ct-staging.hyfnrsx1.com/api/hackathon/saves/'+taskId+'?access_token='+ access_token,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data: 'name='+$scope.name+
                  '&data='+JSON.stringify(res)
        }).success(function (data) {
			window.location.reload();
            $scope.sedit = false;
            $scope.hdetail = true;						
            console.log(data)
        });
		
    };
 
}])

.controller('deleteserviceCtrl', function ($scope, $http) {
    $scope.name = null;
    $scope.data = null;

    $scope.deletedata = function (taskId, name, data) {			
        var data = {
            name: name,
            data: data
        };	
		$scope.remove(taskId);	
        //Call the service to delete data
        $http.delete('https://ct-staging.hyfnrsx1.com/api/hackathon/saves/'+taskId+'?access_token='+ access_token, JSON.stringify(data)).then(function (response) {
            if (response.data)
                $scope.msg = "Data Deleted Successfully!";
        }, function (response) {
        $scope.msg = "Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
        $scope.headers = response.headers();
        });		
		window.location.reload();		
    };

})

.directive('dExpandCollapse', function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs){
            $(".tog").click( function() {
				$('html,body').animate({scrollTop: $(this).offset().top}, 100);				
                $(this).parent().find(".businessDe").removeClass('businessDe').addClass('businessDe1');					
                $(element).find(".businessDe1").slideToggle('200',function() {            
                    $(element).find("span").toggleClass('faqPlus faqMinus');
					$("div.business").find(".businessDe").css({"display":"none","border": "2px solid green"});	
					$('html,body').animate({scrollTop: $(this).offset().top}, 100);			
                });
                if($("div.businessDe1:visible").length>1) {
                    $(this).siblings().find(".businessDe1").slideUp('slow');						
					$("div.business").find(".businessDe1").removeClass('businessDe1').addClass('businessDe');					
                }                
            });
        }
    }
});

function setExpenses(data) 
{
    if (!data) return;
    console.log(data);
    var R = [], row, key, rows, tmp;
    for (var key in data.expenses) {
        rows = [];
        //console.log(key + ': ' + data[key]);
        row = {}
        console.log(data.industry.id);
        row.expense_cat = VOCAB.industry[data.industry.id-1].expenses[key];
        for (var i=0; i<data.expenses[key].length; i++) {
            tmp = data.expenses[key][i];
            rows.push({
                item: tmp[0],
                qty: tmp[1],
                amt: tmp[2]
            });
        }
        row.rows = rows;
        R.push(row);
    }
    console.log(R);
    return R;
}

function getTotal(data)
{
    if (!data) return;
    console.log(data);
    var key, tmp, total = 0;
    for (var key in data.expenses) {
        for (var i=0; i<data.expenses[key].length; i++) {
            tmp = data.expenses[key][i];
			var mult = parseFloat((0+tmp[1]) * (0+tmp[2]));
			total+=mult;
        }
    }
    return total.toFixed(2);
}
