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
	constructor(private http: HttpClient) {}

	getBooks() {
		const url = `${environment.apiUrl}/books`;
		return this.http.get<IBooksResponse>(url);
	}

	createBook(request: IBookCreateRequest) {
		const url = `${environment.apiUrl}/books`;
		return this.http.post<IBookCreateResponse>(url, request);
	}

	updateBook(request: IBookUpdateRequest) {
		const id = String(request.id);
		const body = {
			title: request.title,
			author: request.author,
			rating: request.rating,
		};
		const url = `${environment.apiUrl}/books?id=${id}`;
		return this.http.put<IBookUpdateResponse>(url, body);
	}

	removeBook(request: IBookRemoveRequest) {
		const id = String(request.id);
		const url = `${environment.apiUrl}/books?id=${id}`;
		return this.http.delete<IBookRemoveResponse>(url);
	}
}
