import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksComponent } from './book/books.component';
import { BookCreateComponent } from './book/book-form/book-create.component';
import { BookRemoveComponent } from './book/book-remove/book-remove.component';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		BooksComponent,
		BookCreateComponent,
		BookRemoveComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'BooksApp.Client';
}
