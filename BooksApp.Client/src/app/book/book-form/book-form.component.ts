import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { IBookForm } from './book-form.interface';
import { BookService } from '../../shared/book.service';

@Component({
	selector: 'app-book-form',
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './book-form.component.html',
	styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
	bookForm = new FormGroup<IBookForm>({
		title: new FormControl(),
		author: new FormControl(),
		rating: new FormControl(),
	});
	constructor(public service: BookService) {}
	handleSubmit() {
		this.service.createBook(this.bookForm);
	}
}
