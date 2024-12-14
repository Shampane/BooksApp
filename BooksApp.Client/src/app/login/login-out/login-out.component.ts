import { Component } from '@angular/core';

@Component({
	selector: 'app-login-out',
	imports: [],
	templateUrl: './login-out.component.html',
	styleUrl: './login-out.component.scss',
})
export class LoginOutComponent {
	handleClick(): void {
		localStorage.removeItem('token');
		window.location.reload();
	}
}
