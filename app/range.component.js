"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var RangeComponent = (function () {
    function RangeComponent() {
        this.min = parseInt($('my-app').attr('min'));
        this.max = parseInt($('my-app').attr('max'));
        this.right = parseInt($('my-app').attr('right'));
        this.left = parseInt($('my-app').attr('left'));
    }
    RangeComponent.prototype.ngOnInit = function () {
        this.changeRanges();
    };
    RangeComponent.prototype.onResize = function (event) {
        this.changeRanges();
    };
    RangeComponent.prototype.changeLeft = function (event) {
        var element = event.currentTarget;
        var minValue = this.min;
        var maxValue = this.max;
        var centerValue = maxValue - minValue;
        var position = $(element).position();
        var offset = $(element).offset();
        var progress = $('.alligator-range').offset();
        var fullWith = $('.alligator-range').width();
        var clean = this.eventClean;
        var changeRangeLeft = this.changeRangeLeft;
        var getProcent = this.getProcent;
        var setLeft = this.leftValue;
        document.ondragstart = function () {
            return false;
        };
        document.onmousemove = function (eMove) {
            document.onclick = function (eClick) {
                if (element !== eClick.currentTarget) {
                    clean(element);
                }
            };
            var coordinate = (eMove.pageX - element.offsetWidth / 2) - progress.left;
            if (coordinate >= 0
                && coordinate <= fullWith) {
                var procent = getProcent(coordinate, fullWith);
                var value = (centerValue * procent / 100) + minValue;
                changeRangeLeft(Math.ceil(value));
                $('.alligator-range--progress').css({
                    left: coordinate + 'px'
                });
            }
        };
        element.onmouseup = function () {
            clean(element);
        };
    };
    RangeComponent.prototype.changeRight = function (event) {
        var element = event.currentTarget;
        var minValue = this.min;
        var maxValue = this.max;
        var centerValue = maxValue - minValue;
        var position = $(element).position();
        var offset = $(element).offset();
        var progress = $('.alligator-range').offset();
        var fullWith = $('.alligator-range').width();
        var clean = this.eventClean;
        var changeRangeRight = this.changeRangeRight;
        var getProcent = this.getProcent;
        var setRight = this.rightValue;
        document.ondragstart = function () {
            return false;
        };
        document.onmousemove = function (eMove) {
            document.onclick = function (eClick) {
                if (element !== eClick.currentTarget) {
                    clean(element);
                }
            };
            var originCoor = ((eMove.pageX + element.offsetWidth / 2) - progress.left);
            var coordinate = (fullWith - originCoor);
            if (coordinate >= 0
                && coordinate <= fullWith) {
                var procent = getProcent(originCoor, fullWith);
                var value = (centerValue * procent / 100) + minValue;
                changeRangeRight(Math.ceil(value));
                $('.alligator-range--progress').css({
                    right: coordinate + 'px'
                });
            }
        };
        element.onmouseup = function () {
            clean(element);
        };
    };
    RangeComponent.prototype.changeRanges = function () {
        var progress = $('.alligator-range').offset();
        var progressLeft = progress.left;
        var fullWith = $('.alligator-range').width();
        //left
        var leftProcent = this.getProcent(this.left, (this.max - this.min));
        var leftValue = (fullWith * leftProcent / 100);
        var leftCoordinate = leftValue;
        //right
        var rightProcent = this.getProcent(this.right, (this.max - this.min));
        var rightValue = (fullWith * rightProcent / 100);
        var rightCoordinate = fullWith - rightValue;
        $('.alligator-range--progress').css({
            left: leftCoordinate + 'px',
            right: rightCoordinate + 'px'
        });
        this.changeRangeLeft(this.left);
        this.changeRangeRight(this.right);
    };
    RangeComponent.prototype.getProcent = function (value1, value2) {
        return Math.ceil((value1 / value2) * 100);
    };
    RangeComponent.prototype.changeRangeLeft = function (leftValue) {
        $('.alligator-range--param1').text(leftValue);
    };
    RangeComponent.prototype.changeRangeRight = function (rightValue) {
        $('.alligator-range--param2').text(rightValue);
    };
    RangeComponent.prototype.eventClean = function (element) {
        document.onmousemove = null;
        element.onmouseup = null;
    };
    RangeComponent.prototype.getElementOffsetLeft = function (element) {
        return $(element).offset().left;
    };
    RangeComponent.prototype.getElementOffsetRight = function (element) {
        return $('.alligator-range').width() - $(element).offset().left;
    };
    RangeComponent.prototype.getElementOffsetTop = function (element) {
        return $(element).offset().top;
    };
    RangeComponent.prototype.rightValue = function (value) {
        this.right = value;
    };
    RangeComponent.prototype.leftValue = function (value) {
        this.left = value;
    };
    RangeComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t\t<section class=\"alligator-range--wrapper\" (window:resize)=\"onResize($event)\">\n\t\t\t<div>\n\t\t\t\t<p class=\"alligator-range--param1\">100</p>\n\t\t\t\t-\n\t\t\t\t<p class=\"alligator-range--param2\">1000</p>\n\t\t\t</div>\n\t\t\t<div class=\"alligator-range\" data-max=\"1000\" data-min=\"100\" data-left=\"200\" data-right=\"500\">\n\t\t\t\t<div class=\"alligator-range--progress\">\n\t\t\t\t\t<div class=\"alligator-range--button-left\" (mousedown)=\"changeLeft($event)\"></div>\n\t\t\t\t\t<div class=\"alligator-range--button-right\" (mousedown)=\"changeRight($event)\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], RangeComponent);
    return RangeComponent;
}());
exports.RangeComponent = RangeComponent;
//# sourceMappingURL=range.component.js.map