import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuthRequest, IAuthResponse } from './auth.interfaces';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	token = '';
	constructor(private http: HttpClient) {}
	login(request: IAuthRequest) {
		const url = `${environment.apiUrl}/account/login`;
		return this.http.post<IAuthResponse>(url, request).pipe(
			tap(response => {
				if (response.success && response.token) {
					localStorage.setItem('token', response.token);
				}
			})
		);
	}

	register(request: IAuthRequest) {
		const url = `${environment.apiUrl}/account/register`;
		return this.http.post<IAuthResponse>(url, request);
	}
}
