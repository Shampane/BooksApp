import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';

@Component({
	selector: 'app-book',
	imports: [],
	templateUrl: './book.component.html',
	styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit {
	constructor(public service: BookService) {}
	ngOnInit() {
		this.service.getList();
	}
}
