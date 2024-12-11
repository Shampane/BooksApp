import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';

@Component({
	selector: 'app-book',
	imports: [],
	templateUrl: './books.component.html',
	styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
	columnsNames: string[] = ['#', 'Id', 'Title', 'Author', 'Rating', 'Remove'];

	constructor(public service: BookService) {}
	ngOnInit() {
		this.service.getBooks();
	}
	handleClick(id: string) {
		const result = confirm('Are you sure to remove this book?');
		if (result) {
			this.service.removeBook(id).subscribe({
				error: err => {
					console.log(err.message);
				},
			});
		}
	}
}
