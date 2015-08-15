/**
 * Created by Ren Kloppers.
 */

"use strict";

describe('HotelCtrl data test', function () {
    beforeEach(module('App'));
    describe('HotelCtrl get data', function(){
        var scope, $httpBackend, ctrl;
        beforeEach(inject(function(_$httpBackend_, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('hotels.json').respond({file:'hotels'});
            var scope = {}, ctrl = $controller('HotelCtrl', { $scope: scope });
            scope.loadAppData();
        }));
        it('should check details', function() {
            expect(scope).toBeUndefined();
            $httpBackend.flush();
            expect(scope).toBe(undefined);
        });
    });
});

describe('HotelCtrl display tests', function () {
    beforeEach(module('App'));
    describe('HotelCtrl test setup values', function () {
        it('should display displayAmount', inject(function ($controller) {
            var scope = {}, ctrl = $controller('HotelCtrl', { $scope: scope });
            scope.displayData();
            expect(scope.displayAmount).toBe(10);
        }));

        it('should display currentPage', inject(function ($controller) {
            var scope = {}, ctrl = $controller('HotelCtrl', { $scope: scope });
            scope.displayData();
            expect(scope.currentPage).toBe(0);
        }));

        it('should display maxPageIndex', inject(function ($controller) {
            var scope = {}, ctrl = $controller('HotelCtrl', { $scope: scope });
            scope.displayData();
            expect(scope.maxPageIndex).toBe(1);
        }));

        it('should display star rating', inject(function ($controller) {
            var scope = {}, ctrl = $controller('HotelCtrl', { $scope: scope });
            scope.displayData();
            expect(scope.rating).toBe(5);
        }));
    });
});

describe('HotelCtrl value tests', function () {
    describe("Math Distance tests", function () {
        it("should be distance precision math comparison", function () {
            var dist = 2.117456752500275, val = 2.1;
            expect(dist).not.toBeCloseTo(val, 200);
            expect(dist).toBeCloseTo(val, 1);
        });

        it("should be distance is greater than value", function () {
            var dist = 2.117456752500275, val = 2.1;
            expect(dist).toBeGreaterThan(val);
            expect(val).not.toBeGreaterThan(dist);
        });
    });
});
