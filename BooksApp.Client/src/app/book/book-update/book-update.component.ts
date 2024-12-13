import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { BookService } from '../../shared/book.service';
import { IBookUpdateForm } from './book-update.interface';

@Component({
	selector: 'app-book-update',
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './book-update.component.html',
	styleUrl: './book-update.component.scss',
})
export class BookUpdateComponent {
	updateForm = new FormGroup<IBookUpdateForm>({
		id: new FormControl(),
		title: new FormControl(),
		author: new FormControl(),
		rating: new FormControl(),
	});
	requestStatus = '';

	constructor(public service: BookService) {}
	handleSubmit() {
		const isEmptyForm = Object.values(this.updateForm.value).some(
			value => value === null || value === 'null'
		);
		if (!isEmptyForm) {
			this.service.updateBook(this.updateForm).subscribe({
				next: response => {
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
