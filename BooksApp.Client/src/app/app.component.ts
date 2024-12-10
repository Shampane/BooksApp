import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksComponent } from './book/books.component';
import { ContainerComponent, GridModule } from '@coreui/angular';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, BooksComponent, ContainerComponent, GridModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'BooksApp.Client';
}
