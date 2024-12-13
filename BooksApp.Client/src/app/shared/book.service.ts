import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import {
	IBookCreateRequest,
	IBookCreateResponse,
} from '../book/book-create/book-create.interfaces';
import {
	IBookUpdateRequest,
	IBookUpdateResponse,
} from '../book/book-update/book-update.interfaces';
import {
	IBookRemoveRequest,
	IBookRemoveResponse,
} from '../book/book-remove/book-remove.interfaces';
import { IBooksResponse } from '../book/books.interfaces';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	url: string = environment.apiUrl + '/books';
	constructor(private http: HttpClient) {}

	getBooks() {
		const requestUrl = this.url;
		return this.http.get<IBooksResponse>(requestUrl);
	}

	createBook(request: IBookCreateRequest) {
		const requestUrl = this.url;
		return this.http.post<IBookCreateResponse>(requestUrl, request);
	}

	updateBook(request: IBookUpdateRequest) {
		const id = String(request.id);
		const body = {
			title: request.title,
			author: request.author,
			rating: request.rating,
		};
		const requestUrl = `${this.url}?id=${id}`;
		return this.http.put<IBookUpdateResponse>(requestUrl, body);
	}

	removeBook(request: IBookRemoveRequest) {
		const id = String(request.id);
		const requestUrl = `${this.url}?id=${id}`;
		return this.http.delete<IBookRemoveResponse>(requestUrl);
	}
}
