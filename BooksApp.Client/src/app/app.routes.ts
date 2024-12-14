import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './book/books.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
	{ path: '', component: BooksComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegistrationComponent },
];
