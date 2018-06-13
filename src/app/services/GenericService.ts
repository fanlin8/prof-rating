import { environment } from "../../environments/environment";
import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";

export class GenericService {

	protected env = environment;
	protected messagePrefix: string = "GenericService";

	constructor(
		private messageService: MessageService
	) {
		this.log("Is in production mode: " + this.env.production);
	}

	protected log(message: string) {
		this.messageService.add(this.messagePrefix + ": " + message);
	}

	protected handleError<T>(operation = "operation", result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.error.message || error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}