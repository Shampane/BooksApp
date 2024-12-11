import { FormControl } from '@angular/forms';

export interface IBookForm {
	title: FormControl<string>;
	author: FormControl<string>;
	rating: FormControl<number>;
}
