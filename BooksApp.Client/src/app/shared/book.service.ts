import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'typescript-eslint';
import { environment } from '../../environments/environment.development';
import { IBookModel } from './book.model';
import { ICreateForm } from '../book/book-form/book-create.interface';
import { FormGroup } from '@angular/forms';
import { IRemoveForm } from '../book/book-remove/book-remove.interface';

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

	removeBook(id: string) {
		return this.http.delete(this.url + '?id=' + id, { responseType: 'text' });
	}
}
