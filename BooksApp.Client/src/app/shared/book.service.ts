import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'typescript-eslint';
import { environment } from '../../environments/environment.development';
import { IBookModel } from './book.model';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	url: string = environment.apiUrl + '/books';
	list: IBookModel[] = [];
	constructor(private http: HttpClient) {}

	getList() {
		this.http.get<Config>(this.url).subscribe({
			next: response => {
				this.list = response as IBookModel[];
			},
			error: err => {
				console.log(err.message);
			},
		});
	}
}
