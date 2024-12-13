import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest, ILoginResponse } from './auth.interfaces';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	token = '';
	constructor(private http: HttpClient) {}
	login(request: ILoginRequest) {
		const url = `${environment.apiUrl}/account/login`;
		return this.http.post<ILoginResponse>(url, request).pipe(
			tap(response => {
				if (response.success && response.token) {
					localStorage.setItem('token', response.token);
				}
			})
		);
	}
}
