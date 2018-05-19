import { tap, delay } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

@Injectable()
export class AuthService {
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private router: Router, private messageService: MessageService) {
    }

    private log(message: string) {
        this.messageService.add("AuthService: " + message);
    }

    login(): Observable<boolean> {
        return of(true).pipe(
            delay(1000),
            tap(_ => {
                this.isLoggedIn = true;
                this.log("Logged In.");
            }));
    }

    logout(): void {
        this.isLoggedIn = false;
        this.log("Logged Out.")
    }
}
