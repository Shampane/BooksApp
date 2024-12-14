import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {
	IAuthForm,
	IAuthRequest,
	IAuthResponse,
} from '../shared/auth.interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-registration',
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './registration.component.html',
	styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
	response?: IAuthResponse;
	form = new FormGroup<IAuthForm>({
		email: new FormControl(),
		password: new FormControl(),
	});
	constructor(
		private service: AuthService,
		private router: Router
	) {}

	onSubmit() {
		const request = {} as IAuthRequest;
		request.email = this.form.controls['email'].value;
		request.password = this.form.controls['password'].value;
		this.service.register(request).subscribe({
			next: response => {
				this.response = response;
				const loginRequest = {} as IAuthRequest;
				loginRequest.email = request.email;
				loginRequest.password = request.password;
				this.service.login(loginRequest).subscribe({
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
			},
			error: err => {
				console.log(err.message);
				this.response = err.error;
			},
		});
	}
}
