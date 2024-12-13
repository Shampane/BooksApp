import { FormControl } from '@angular/forms';

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginForm {
	email: FormControl<string>;
	password: FormControl<string>;
}

export interface ILoginResponse {
	success: boolean;
	message: string;
	token?: string;
}
