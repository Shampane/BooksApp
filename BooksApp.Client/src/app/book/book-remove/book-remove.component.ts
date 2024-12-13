import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../shared/book.service';
import { IRemoveForm } from './book-remove.interface';

@Component({
	selector: 'app-book-remove',
	imports: [ReactiveFormsModule],
	templateUrl: './book-remove.component.html',
	styleUrl: './book-remove.component.scss',
})
export class BookRemoveComponent {
	removeForm = new FormGroup<IRemoveForm>({
		id: new FormControl(),
	});
	requestStatus = '';

	constructor(public service: BookService) {}

	handleSubmit() {
		const id = this.removeForm.value.id;
		if (id !== null && id !== '') {
			const result = confirm('Are you sure to remove this book?');
			if (result) {
				this.service.removeBook(id!).subscribe({
					next: () => {
						this.requestStatus = 'Successfully removed';
					},
					error: err => {
						console.log(err.message);
						this.requestStatus = 'Error removing book';
					},
				});
			}
		}
	}
}
