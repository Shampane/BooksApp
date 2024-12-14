import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { IBooksResponse } from './books.interfaces';
import { IBookRemoveRequest } from './book-remove/book-remove.interfaces';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookRemoveComponent } from './book-remove/book-remove.component';
import { BookUpdateComponent } from './book-update/book-update.component';

@Component({
	selector: 'app-book',
	imports: [BookCreateComponent, BookRemoveComponent, BookUpdateComponent],
	templateUrl: './books.component.html',
	styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
	columnsNames: string[] = ['#', 'Id', 'Title', 'Author', 'Rating', 'Remove'];
	data?: IBooksResponse;

	constructor(public service: BookService) {}
	ngOnInit() {
		this.service.getBooks().subscribe({
			next: response => {
				this.data = response as IBooksResponse;
			},
			error: err => {
				console.log(err.message);
			},
		});
	}
	handleClick(id: string) {
		const result = confirm('Are you sure to remove this book?');
		const request: IBookRemoveRequest = { id };
		if (result) {
			this.service.removeBook(request).subscribe({
				error: err => {
					console.log(err.message);
				},
			});
			window.location.reload();
		}
	}
}
