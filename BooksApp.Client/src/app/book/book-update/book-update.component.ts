import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { BookService } from '../../shared/book.service';
import { IBookUpdateForm, IBookUpdateRequest } from './book-update.interfaces';

@Component({
	selector: 'app-book-update',
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './book-update.component.html',
	styleUrl: './book-update.component.scss',
})
export class BookUpdateComponent {
	form = new FormGroup<IBookUpdateForm>({
		id: new FormControl(),
		title: new FormControl(),
		author: new FormControl(),
		rating: new FormControl(),
	});
	requestStatus = '';

	constructor(public service: BookService) {}
	handleSubmit() {
		const isEmptyForm = Object.values(this.form.value).some(
			value => value === null || value === 'null'
		);
		if (!isEmptyForm) {
			const valuesObject = this.form.value;
			const request: IBookUpdateRequest = {
				id: valuesObject.id as string,
				title: valuesObject.title as string,
				author: valuesObject.author as string,
				rating: valuesObject.rating as number,
			};
			this.service.updateBook(request).subscribe({
				next: () => {
					this.requestStatus = 'Successfully updated';
				},
				error: err => {
					console.log(err.message);
					this.requestStatus = 'Error updating book';
				},
			});
		}
	}
}
