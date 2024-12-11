import { FormControl } from '@angular/forms';

export interface ICreateForm {
	title: FormControl<string>;
	author: FormControl<string>;
	rating: FormControl<number>;
}
