import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, RouterOutlet, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'BooksApp.Client';
}
