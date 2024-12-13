import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { IBookCreateForm, IBookCreateRequest } from './book-create.interfaces';
import { BookService } from '../../shared/book.service';

@Component({
	selector: 'app-book-create',
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './book-create.component.html',
	styleUrl: './book-create.component.scss',
})
export class BookCreateComponent {
	form = new FormGroup<IBookCreateForm>({
		title: new FormControl(),
		author: new FormControl(),
		rating: new FormControl(),
	});
	responseStatus = '';

	constructor(public service: BookService) {}
	handleSubmit() {
		const isEmptyForm = Object.values(this.form.value).some(
			value => value === null || value === 'null'
		);
		if (!isEmptyForm) {
			const valuesObject = this.form.value;
			const request: IBookCreateRequest = {
				title: valuesObject.title as string,
				author: valuesObject.author as string,
				rating: valuesObject.rating as number,
			};
			this.service.createBook(request).subscribe({
				next: () => {
					this.responseStatus = 'Successfully created';
				},
				error: err => {
					console.log(err.message);
					this.responseStatus = 'Error creating book';
				},
			});
		}
	}
}
