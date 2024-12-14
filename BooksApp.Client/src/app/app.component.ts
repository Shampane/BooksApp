import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginOutComponent } from './login/login-out/login-out.component';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		RouterLink,
		RouterOutlet,
		CommonModule,
		LoginOutComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	title = 'BooksApp.Client';
	token = localStorage.getItem('token');
	constructor(protected router: Router) {}

	async ngOnInit() {
		this.token = localStorage.getItem('token');
		if (!this.token) {
			await this.router.navigate(['/']);
			localStorage.removeItem('token');
		}
	}
}
