import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../shared/book.service';
import { IBookRemoveForm, IBookRemoveRequest } from './book-remove.interfaces';

@Component({
	selector: 'app-book-remove',
	imports: [ReactiveFormsModule],
	templateUrl: './book-remove.component.html',
	styleUrl: './book-remove.component.scss',
})
export class BookRemoveComponent {
	form = new FormGroup<IBookRemoveForm>({
		id: new FormControl(),
	});
	responseStatus = '';

	constructor(public service: BookService) {}

	handleSubmit() {
		const id = this.form.value.id as string;
		if (id && id !== '') {
			const result = confirm('Are you sure to remove this book?');
			if (result) {
				const request: IBookRemoveRequest = { id };
				this.service.removeBook(request).subscribe({
					next: () => {
						this.responseStatus = 'Successfully removed';
					},
					error: err => {
						console.log(err.message);
						this.responseStatus = 'Error removing book';
					},
				});
			}
		}
	}
}
