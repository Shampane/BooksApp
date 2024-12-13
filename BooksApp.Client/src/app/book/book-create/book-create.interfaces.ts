import { FormControl } from '@angular/forms';

export interface IBookCreateForm {
	title: FormControl<string>;
	author: FormControl<string>;
	rating: FormControl<number>;
}

export interface IBookCreateRequest {
	title: string;
	author: string;
	rating: number;
}
export interface IBookCreateResponse {
	success: boolean;
	message?: string;
	errorMessage?: string;
}
