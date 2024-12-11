import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { ICreateForm } from './book-create.interface';
import { BookService } from '../../shared/book.service';

@Component({
	selector: 'app-book-create',
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './book-create.component.html',
	styleUrl: './book-create.component.scss',
})
export class BookCreateComponent {
	createForm = new FormGroup<ICreateForm>({
		title: new FormControl(),
		author: new FormControl(),
		rating: new FormControl(),
	});
	requestStatus = '';

	constructor(public service: BookService) {}
	handleSubmit() {
		this.service.createBook(this.createForm).subscribe({
			next: () => {
				this.requestStatus = 'Successfully created';
			},
			error: () => {
				this.requestStatus = 'Error creating book';
			},
		});
	}
}
