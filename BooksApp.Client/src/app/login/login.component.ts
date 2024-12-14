import { Component } from '@angular/core';
import {
	IAuthForm,
	IAuthRequest,
	IAuthResponse,
} from '../shared/auth.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	response?: IAuthResponse;
	form = new FormGroup<IAuthForm>({
		email: new FormControl(),
		password: new FormControl(),
	});
	constructor(
		private router: Router,
		private service: AuthService
	) {}

	onSubmit() {
		const request = {} as IAuthRequest;
		request.email = this.form.controls['email'].value;
		request.password = this.form.controls['password'].value;
		this.service.login(request).subscribe({
			next: async response => {
				this.response = response;
				if (response.success) {
					await this.router.navigate(['/']);
					window.location.reload();
				}
			},
			error: err => {
				console.log(err.message);
				this.response = err.error;
			},
		});
	}
}
