import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'typescript-eslint';
import { environment } from '../../environments/environment.development';
import { IBookModel } from './book.model';
import { IBookForm } from '../book/book-form/book-form.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	url: string = environment.apiUrl + '/books';
	list: IBookModel[] = [];
	constructor(private http: HttpClient) {}

	getBooks() {
		this.http.get<Config>(this.url).subscribe({
			next: response => {
				this.list = response as IBookModel[];
			},
			error: err => {
				console.log(err.message);
			},
		});
	}

	createBook(book: FormGroup<IBookForm>) {
		this.http.post(this.url, book.value).subscribe({
			next: response => {
				console.log(response);
			},
			error: err => {
				console.log(err.message);
			},
		});
	}
}
