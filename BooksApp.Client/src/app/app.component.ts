import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksComponent } from './book/books.component';
import { BookCreateComponent } from './book/book-create/book-create.component';
import { BookRemoveComponent } from './book/book-remove/book-remove.component';
import { BookUpdateComponent } from './book/book-update/book-update.component';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		BooksComponent,
		BookCreateComponent,
		BookRemoveComponent,
		BookUpdateComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'BooksApp.Client';
}
