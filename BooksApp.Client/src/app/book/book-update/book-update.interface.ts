import { FormControl } from '@angular/forms';

export interface IBookUpdateForm {
	id: FormControl<string>;
	title: FormControl<string>;
	author: FormControl<string>;
	rating: FormControl<number>;
}
