import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { TableModule } from '@coreui/angular';

@Component({
	selector: 'app-book',
	imports: [TableModule],
	templateUrl: './books.component.html',
	styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
	constructor(public service: BookService) {}
	ngOnInit() {
		this.service.getList();
	}
}
