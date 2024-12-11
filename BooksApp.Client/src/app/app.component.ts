import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksComponent } from './book/books.component';
import { BookFormComponent } from './book/book-form/book-form.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, BooksComponent, BookFormComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'BooksApp.Client';
}
