/**
 * Created by Ren Kloppers.
 */

"use strict";
var app = angular.module('App', ['ngLoadingSpinner']);

//create controller and load the data file
app.controller('HotelCtrl', function($scope, $http, $filter) {
    var orderBy = $filter('orderBy');
    $scope.loadAppData = function() {
        $http.get('hotels.json')
            .success(function(response) {
                $scope.names = response.Establishments;
                $scope.displayData();
            })
            .error(function(error) {
                alert('An error occured.');
            });
    };
    //display data when ready and app set up values
    $scope.displayData = function() {
        $scope.displayAmount = 10;
        $scope.currentPage = 0;
        $scope.maxPageIndex = 1;
        $scope.rating = 5;
        $scope.Math = window.Math;
        $scope.numberOfPages = function () {
            return Math.ceil(($scope.names.length/$scope.maxPageIndex)/$scope.displayAmount);
        };
        $scope.order = function(predicate, reverse) {
            $scope.names = orderBy($scope.names, predicate, reverse);
            $scope.currentPage = 0;
        };
        //disable the horizontal scroll
        $(function() {
            var $body = $(document);
            $body.bind('scroll', function() {
                if ($body.scrollLeft() !== 0) {
                    $body.scrollLeft(0);
                }
            });
        });
    }
});

//page filter items to display
app.filter('pagination', function() {
    return function(input, start) {
        if(input){
            start = +start;
            return input.slice(start);
        }
    };
});

//star rating directive and update star items to display
app.directive("starRating", function() {
    return {
        restrict: 'A',
        template: '<ul class="rating">' + '<li ng-repeat="star in stars" ng-class="star">' + '\u2605' + '</li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function(scope) {
            var updateStarsItems = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled : i < scope.ratingValue
                    });
                }
            };
            scope.$watch('ratingValue',
                function(oldValue, newValue) {
                    if (newValue) {
                        updateStarsItems();
                    }
                }
            );
        }
    };
});