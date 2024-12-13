import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'typescript-eslint';
import { environment } from '../../environments/environment.development';
import { IBookModel } from './book.model';
import { ICreateForm } from '../book/book-create/book-create.interface';
import { FormGroup } from '@angular/forms';
import { IBookUpdateForm } from '../book/book-update/book-update.interface';

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

	createBook(book: FormGroup<ICreateForm>) {
		return this.http.post(this.url, book.value, { responseType: 'text' });
	}

	updateBook(book: FormGroup<IBookUpdateForm>) {
		const id = String(book.value.id);
		const { title, author, rating } = book.value;
		const body = {
			title: String(title),
			author: String(author),
			rating: String(rating),
		};
		return this.http.put(this.url + '?id=' + id, body, {
			responseType: 'text',
		});
	}

	removeBook(id: string) {
		return this.http.delete(this.url + '?id=' + id, { responseType: 'text' });
	}
}
