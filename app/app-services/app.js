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
      
.controller("gridListDemoCtrl", function($scope, $http, $window) {

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
		if (!access_token){
         $('#loading').css('display','none'); 
		} else {
        $('#loading').css('display','block');
		}
        $http.get(API_ROOT+'saves?access_token='+ access_token)
        .success(function (data) {
        $scope.buss = data;	
		 $('#loading').css('display','none');         		
        });
        return buss;			
    };
	$scope.remove = function(item) {		
		$("#bor"+item).fadeOut();
		$("#borde"+item).fadeOut();		
	}
	$scope.detailTask = function(taskId){
		$scope.hdetail = true;
            $scope.items = $scope.buss[taskId];			
            $scope.name = $scope.items.name;			
            id = $scope.items.id;
			editId = $scope.items.id;
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
					if(!$scope.target){
						scoreSet = true;
					}
					$scope.gender = dta.gender;
					$scope.age = dta.age;
					$scope.city = dta.city;
					$scope.state = dta.state;
					$scope.location = dta.location;
					$scope.comp = dta.comp;
					$scope.expense_rows_edit = editExpenses(dta);
					$scope.expense_rows_disp = setExpenses(dta);
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
		
        //$scope.edit_handlers();
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
			'<link rel="stylesheet" type="text/css" href="app-content/file.css" />' +
			'</head><body onload="window.print(); window.close();"><div>' + printContents + '</div></html>');
		popupWin.document.close();
		};
})

.controller("editController",['$scope', '$http', 'fileUpload', '$compile', '$mdDialog', '$window', function($scope, $http, fileUpload, $compile, $mdDialog, $window){
	//$compile('#edit'+0)($scope);
	
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
    
    $scope.editBusinessIdea = function (taskId, ev) {
		$('#loading').css('display','block');
		$('.business').css({'opacity': '0.3', 'pointers-events': 'none'});
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
			advertise: $scope.advertise,
            expenses: $scope.getExpenses2($scope)
		};      
		console.log(res);	    
        $http({
            method: 'PUT',
            datatype: "json",
            url: API_ROOT+'saves/'+taskId+'?access_token='+ access_token,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data: 'name='+$scope.name+
                  '&data='+JSON.stringify(res)
        }).success(function (data, ev) {
			if(scoreSet){
				editScoringFinalSubmit();
				$scope.dialogThree(ev);
			} else {			
			$scope.showConfirm(ev, data);
			}
			$('#loading').css('display','none');
			$('.business').css({'opacity': '1', 'pointers-events': 'auto'});
        });		
    };
	
	$scope.showConfirm = function (ev, data) {
		var confirm = $mdDialog.confirm()
          .title('Success!')
          .textContent('You have completed editing your business idea.')
          .ariaLabel('Business Plan Complete')
          .targetEvent(ev)
          .ok('Confirm')
		$mdDialog.show(confirm).then(function() {
			$scope.total = getTotal(data);
			$window.location.href = '#/home';
            $scope.sedit = false;
            $scope.hdetail = true;						
            console.log(data);
		});
	};
	$scope.dialogThree = function (ev) {
		var confirm = $mdDialog.confirm({
			controller: DialogController,
			templateUrl: 'dialogtmpl3.html',
			parent: angular.element(document.body),
			targetEvent: ev,
		})
		$mdDialog.show(confirm).then(function(){
			$window.location.href = '#/home';
		});
	};
	function editScoringFinalSubmit() {
		$http({
		method: 'POST',
		datatype: "json",
		url: API_ROOT+'scoring?access_token='+access_token+'&event_name=step_2_complete',
		headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	}).success(function (response) {
		console.log(response)
		pts = response.points_earned;
		total_pts = response.total_points;
		document.getElementById("pts-two").innerHTML = "You have earned " +pts + " points";
		//document.getElementById("total_pts").innerHTML = "Total Points earned: " +total_pts;	
		})
	};
	$scope.editExpenseRow =function(idx) {
		console.log(idx);
		if(!$scope.expense_rows_edit[idx].rows){
			console.log("inside");
			$scope.expense_rows_edit[idx].rows = [];
		}
		var cat = $scope.expense_rows_edit[idx];
		console.log(cat);		
		cat.rows.push({
                    item: '',
                    qty: '',
                    amt: ''
                });			
};
	$scope.deleteRow =function(idx, itm, qty, pri) {			
		var cat = $scope.expense_rows_edit[idx];
		var total ="";		
		var index = "";		
		var comArr = $scope.expense_rows_edit[idx].rows;		
		for( var i = 0; i < comArr.length; i++ ) {			
			if( comArr[i].item === itm ) {				
				index = i;
				var mult = parseFloat((0+qty) * (0+pri));							
				$scope.total = $scope.total - mult;				
				break;
			}			
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}		
		$scope.expense_rows_edit[idx].rows.splice(index, 1);			
		//onBlurTotal();
	};
	$scope.onBlurTotal = function () {
		var data = {}, ind, subs, rows, row, total = 0;
		var indId = $('#indusId').val();
		subs = VOCAB.industry[indId-1].expenses;		
		ind = $('#indusVal').val();
		for (var i=0; i<subs.length; i++) {			
			rows = $("#edit"+i).find("tbody tr");			
			for (var z=0; z<rows.length; z++) {
				var qty, amt, mult;
				row = $(rows[z]);
				qty = row.find('#qty').val();
				amt = row.find('#price').val();
				if (!qty || !amt){
					return;
				}
				mult = parseFloat((0+qty) * (0+amt));
				total+=mult;
			}
		}
		total = total.toFixed(2);			
		$scope.total = total;	
	}
//$scope.edit_handlers();
 $scope.getExpenses2 = function (scope) {
	 //$compile('.table')(scope);
	 //scope.$apply();
    var data = {}, cats, ind, subs, lbl, tab, rows, row;
    cats = scope.expCatList;
    //ind = pindustry.value;
    ind = scope.industry.id;
    //console.log(cats);
    //console.log(cats.length);
    //console.log(ind);
    /*
    for (var i=0; i<cats.length; i++) {
        if (cats[i].industry == ind) {
            subs = cats[i].expList;
            break;
        }
    }
    */
    console.log('get2');
    subs = VOCAB.industry[ind-1].expenses;
    console.log(subs);
    for (var i=0; i<subs.length; i++) {
        lbl = subs[i];
        //console.log(lbl);		
        tab = $('#edit'+i);
        console.log(tab);
        rows = tab.find('tbody tr');
        //console.log(rows);
        for (var z=0; z<rows.length; z++) {
            var itm, qty, amt;
            row = $(rows[z]);
            //console.log(row);            
            itm = row.find('#item').val();
            qty = row.find('#qty').val();
            amt = row.find('#price').val();
            /*
            itm = row.find('#item');
            qty = row.find('#qty');
            amt = row.find('#price');*/
			
            console.log(itm, qty, amt);
            console.info(itm +' - '+qty+' * '+amt);
            if (!data[i]) {
                data[i] = [];
            }
            data[i].push(Array(itm, qty, amt));
        }
    }
    console.log(data);
    return data;
};

}])

.controller('deleteserviceCtrl', function ($scope, $http, $mdDialog) {
    $scope.name = null;
    $scope.data = null;
	
	$scope.showDeleteConfirm = function (ev, taskId, name, data) {
		var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this business plan?')
          .ariaLabel('Confirm delete')
          .targetEvent(ev)
          .ok('Confirm')
          .cancel('Cancel');
		$mdDialog.show(confirm).then(function() {
		  $scope.deletedata(taskId, name, data);
		  //window.location.reload();
		}, function() {
		  $mdDialog.cancel();
		});
	}
	
    $scope.deletedata = function (taskId, name, data) {			
        var data = {
            name: name,
            data: data
        };	
		$scope.remove(taskId);	
        //Call the service to delete data
        $http.delete(API_ROOT+'/saves/'+taskId+'?access_token='+ access_token, JSON.stringify(data)).then(function (response) {
            if (response.data)
                $scope.msg = "Data Deleted Successfully!";
        }, function (response) {
        $scope.msg = "Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
        $scope.headers = response.headers();
        });	
		//$window.location.href = '#/home';		
    };
	
	$scope.showConfirm = function (ev) {
		var confirm = $mdDialog.confirm()
		  .title('Are you sure?')		  
		  .targetEvent(ev)
		  $scope.deletedata()
		  .ok('Save & Exit')
		$mdDialog.show(confirm).then(function() {
		  $window.location.href = '#/home';
		});
	};
	
	

})

.directive('dExpandCollapse', function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs){
            $(".tog").click( function() {
				$('html,body').animate({scrollTop: $(this).offset().top}, 10);				
                $(this).parent().find(".businessDe").removeClass('businessDe').addClass('businessDe1');					
                $(element).find(".businessDe1").slideToggle('200',function() {            
                    $(element).find("span").toggleClass('faqPlus faqMinus');
					$("div.business").find(".businessDe").css({"display":"none","border": "2px solid green"});	
					$('html,body').animate({scrollTop: $(this).offset().top}, 10);			
                });
                if($("div.businessDe1:visible").length>1) {
                    $(this).siblings().find(".businessDe1").slideUp('slow');						
					$("div.business").find(".businessDe1").removeClass('businessDe1').addClass('businessDe');					
                }                
            });
        }
    }
});

function editExpenses(data) 
{
	
    var R=[], subs, row, rows;
    subs = VOCAB.industry[data.industry.id-1].expenses;
    for (var i=0; i<subs.length; i++) {
        row = {};
        row.index = i;
        row.expense_cat = subs[i];
		if (!data.expenses) {
			//donothing;
		}else		
        if (data.expenses[i]) {
            //console.log(data.expenses[i]);
            rows = [];
            for (var j=0; j<data.expenses[i].length; j++) {
                var tmp = data.expenses[i][j];
                //console.log(tmp);
                rows.push({
                    item: tmp[0],
                    qty: tmp[1],
                    amt: tmp[2]
                });
            }
            row.rows = rows;
        }
        R.push(row);
    }
    //console.log(R);
    return R;
}
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
/*
function getExpenses2(scope, $compile) {
    var data = {}, cats, ind, subs, lbl, tab, rows, row;
    cats = scope.expCatList;
    //ind = pindustry.value;
    ind = scope.industry.id;
    //console.log(cats);
    //console.log(cats.length);
    //console.log(ind);
    
    for (var i=0; i<cats.length; i++) {
        if (cats[i].industry == ind) {
            subs = cats[i].expList;
            break;
        }
    }
    
    console.log('get2');
    subs = VOCAB.industry[ind-1].expenses;
    console.log(subs);
    for (var i=0; i<subs.length; i++) {
        lbl = subs[i];
        //console.log(lbl);
		$compile('#edit'+i)(scope);
        tab = $('#edit'+i);
        console.log(tab);
        rows = tab.find('tbody tr');
        //console.log(rows);
        for (var z=0; z<rows.length; z++) {
            var itm, qty, amt;
            row = $(rows[z]);
            //console.log(row);            
            itm = row.find('#item').val();
            qty = row.find('#qty').val();
            amt = row.find('#price').val();
            /*
            itm = row.find('#item');
            qty = row.find('#qty');
            amt = row.find('#price');
			
            console.log(itm, qty, amt);
            console.info(itm +' - '+qty+' * '+amt);
            if (!data[i]) {
                data[i] = [];
            }
            data[i].push(Array(itm, qty, amt));
        }
    }
    console.log(data);
    return data;
}
*/
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
/*
function onBlurTotal(eid)
{
	var data = {}, ind, subs, rows, row, total = 0;
	var indId = $('#indusId').val();
	console.info("industry id is: " + indId);
	
	subs = VOCAB.industry[indId-1].expenses;
	
	ind = $('#indusVal').val();
	console.info("industry is: " + ind);

	
	for (var i=0; i<subs.length; i++) {
		
		rows = $("#edit"+i).find("tbody tr");
		console.info(rows);
		for (var z=0; z<rows.length; z++) {
			var qty, amt, mult;
			row = $(rows[z]);
			qty = row.find('#qty').val();
			amt = row.find('#price').val();
			if (!qty || !amt){
				return;
			}
			mult = parseFloat((0+qty) * (0+amt));
			total+=mult;
		}
	}
	total = total.toFixed(2);
	console.info(total);	
	$("#totalEdit"+eid).text(total);	

	var oldTotal = $('#totalEdit'+eid);
	console.info(oldTotal.text());
}
*/
var editId, scoreSet="";