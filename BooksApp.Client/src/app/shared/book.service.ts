import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'typescript-eslint';
import { environment } from '../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	url: string = environment.apiUrl + '/books';
	constructor(private http: HttpClient) {}

	getList() {
		this.http.get<Config>(this.url).subscribe({
			next: response => {
				console.log(response);
			},
			error: err => {
				console.log(err);
			},
		});
	}
}
