import { Component, OnInit } from '@angular/core';
import {
	ILoginForm,
	ILoginRequest,
	ILoginResponse,
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
	response?: ILoginResponse;
	form = new FormGroup<ILoginForm>({
		email: new FormControl(),
		password: new FormControl(),
	});
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private service: AuthService
	) {}

	onSubmit() {
		const request = {} as ILoginRequest;
		request.email = this.form.controls['email'].value;
		request.password = this.form.controls['password'].value;
		this.service.login(request).subscribe({
			next: response => {
				this.response = response;
			},
			error: err => {
				console.log(err.message);
				this.response = err.error;
			},
		});
	}
}
