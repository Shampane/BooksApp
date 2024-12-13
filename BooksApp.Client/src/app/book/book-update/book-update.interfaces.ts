import { FormControl } from '@angular/forms';

export interface IBookUpdateForm {
	id: FormControl<string>;
	title: FormControl<string>;
	author: FormControl<string>;
	rating: FormControl<number>;
}

export interface IBookUpdateRequest {
	id: string;
	title: string;
	author: string;
	rating: number;
}
export interface IBookUpdateResponse {
	success: boolean;
	message?: string;
	errorMessage?: string;
}
