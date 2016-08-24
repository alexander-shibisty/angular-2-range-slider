import { Input, Component, OnInit } from '@angular/core';
declare let $:JQueryStatic;

@Component({
	selector: 'my-app',
	template: `
		<section class="alligator-range--wrapper" (window:resize)="onResize($event)">
			<div>
				<p class="alligator-range--param1">100</p>
				-
				<p class="alligator-range--param2">1000</p>
			</div>
			<div class="alligator-range" data-max="1000" data-min="100" data-left="200" data-right="500">
				<div class="alligator-range--progress">
					<div class="alligator-range--button-left" (mousedown)="changeLeft($event)"></div>
					<div class="alligator-range--button-right" (mousedown)="changeRight($event)"></div>
				</div>
			</div>
		</section>
	`
})

export class RangeComponent implements OnInit {

	public min: number;
	public max: number;

	public right: number;
	public left: number;

	constructor() {
		this.min = parseInt($('my-app').attr('min'));
		this.max = parseInt($('my-app').attr('max'));

		this.right = parseInt($('my-app').attr('right'));
		this.left = parseInt($('my-app').attr('left'));
	}

	public ngOnInit() {
		this.changeRanges();
	}

	public onResize(event: any){
		this.changeRanges();
	}

	public changeLeft(event: any) {
		let element = event.currentTarget;

		let minValue = this.min;
		let maxValue = this.max;
		let centerValue = maxValue - minValue;

		let position = $(element).position();
		let offset = $(element).offset();
		let progress = $('.alligator-range').offset();
		let fullWith = $('.alligator-range').width();

		let clean = this.eventClean;
		let changeRangeLeft = this.changeRangeLeft;
		let getProcent = this.getProcent;
		let setLeft = this.leftValue;

		document.ondragstart = function() {
			return false;
		};

		document.onmousemove = function(eMove) {
			document.onclick = function(eClick){
				if(element !== eClick.currentTarget) {
					clean(element);
				}
			}

			let coordinate = (eMove.pageX - element.offsetWidth / 2) - progress.left;

			if(
				coordinate >= 0 
				&& coordinate <= fullWith
				//&& this.right > this.left
			) {
				let procent = getProcent(coordinate, fullWith);
				let value = (centerValue * procent / 100) + minValue;

				changeRangeLeft(Math.ceil(value));

				$('.alligator-range--progress').css({
					left: coordinate + 'px'
				});
			}
		}

		element.onmouseup = function() {
			clean(element);
		}
	}

	public changeRight(event: any) {
		let element = event.currentTarget;

		let minValue = this.min;
		let maxValue = this.max;
		let centerValue = maxValue - minValue;

		let position = $(element).position();
		let offset = $(element).offset();
		let progress = $('.alligator-range').offset();
		let fullWith = $('.alligator-range').width();

		let clean = this.eventClean;
		let changeRangeRight = this.changeRangeRight;
		let getProcent = this.getProcent;
		let setRight = this.rightValue;

		document.ondragstart = function() {
			return false;
		};

		document.onmousemove = function(eMove) {
			document.onclick = function(eClick){
				if(element !== eClick.currentTarget) {
					clean(element);
				}
			}

			let originCoor = ((eMove.pageX + element.offsetWidth / 2) - progress.left);
			let coordinate = (fullWith - originCoor);

			if(
				coordinate >= 0 
				&& coordinate <= fullWith
				//&& this.right > this.left
			) {
				let procent = getProcent(originCoor, fullWith);
				let value = (centerValue * procent / 100) + minValue;

				changeRangeRight(Math.ceil(value));

				$('.alligator-range--progress').css({
					right: coordinate + 'px'
				});
			}
		}

		element.onmouseup = function() {
			clean(element);
		}
	}

	public changeRanges() {
		let progress = $('.alligator-range').offset();
		let progressLeft = progress.left;
		let fullWith = $('.alligator-range').width();

		//left
		let leftProcent = this.getProcent(this.left, (this.max - this.min));
		let leftValue = (fullWith * leftProcent / 100);
		let leftCoordinate = leftValue;

		//right
		let rightProcent = this.getProcent(this.right, (this.max - this.min));
		let rightValue = (fullWith * rightProcent / 100);
		let rightCoordinate = fullWith - rightValue;

		$('.alligator-range--progress').css({
			left: leftCoordinate + 'px',
			right: rightCoordinate + 'px'
		});

		this.changeRangeLeft(this.left);
		this.changeRangeRight(this.right);
	}

	private getProcent(value1: number, value2: number): number {
		return Math.ceil((value1 / value2) * 100);
	}

	private changeRangeLeft( leftValue: number ): void {
		$('.alligator-range--param1').text(leftValue);
	}

	private changeRangeRight( rightValue: number ): void {
		$('.alligator-range--param2').text(rightValue);
	}

	private eventClean(element: any) {
		document.onmousemove = null;
		element.onmouseup = null;
	}

	private getElementOffsetLeft(element: any): number {
		return $(element).offset().left;
	}

	private getElementOffsetRight(element: any): number {
		return $('.alligator-range').width() - $(element).offset().left;
	}

	private getElementOffsetTop(element: any): number {
		return $(element).offset().top;
	}

	public rightValue(value: number) {
		this.right = value;
	}

	public leftValue(value: number) {
		this.left = value;
	}

}
