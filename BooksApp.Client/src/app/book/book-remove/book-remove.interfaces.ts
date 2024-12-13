import { FormControl } from '@angular/forms';

export interface IBookRemoveForm {
	id: FormControl<string>;
}

export interface IBookRemoveRequest {
	id: string;
}

export interface IBookRemoveResponse {
	success: boolean;
	message?: string;
	errorMessage?: string;
}
