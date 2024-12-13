import { IBookModel } from '../shared/book.model';

export interface IBooksResponse {
	success: boolean;
	list?: IBookModel[];
	errorMessage?: string;
}
