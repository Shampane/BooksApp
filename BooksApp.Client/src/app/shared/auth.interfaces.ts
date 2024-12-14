import { FormControl } from '@angular/forms';

export interface IAuthRequest {
	email: string;
	password: string;
}

export interface IAuthForm {
	email: FormControl<string>;
	password: FormControl<string>;
}

export interface IAuthResponse {
	success: boolean;
	message: string;
	token?: string;
}
