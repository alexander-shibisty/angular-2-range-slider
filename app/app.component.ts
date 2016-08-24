import { Input, Component, OnInit } from '@angular/core';
declare let $:JQueryStatic;

import { RangeComponent } from './range.component';

@Component({
	selector: 'range-app',
	template: `
		<my-app max="1000" min="1" left="100" right="200"></my-app>
	`,
	directives: [
		RangeComponent
	]
})

export class AppComponent implements OnInit {

	constructor() {

	}

	ngOnInit() {

	}

}
