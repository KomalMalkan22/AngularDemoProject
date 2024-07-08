import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private apiUrl = 'https://localhost:7206/api/auth/login';
    private tokenKey = 'token';

    constructor(private http: HttpClient, private router: Router){}

    login(userName: string, passwordHash: string): Observable<any>{
        return this.http.post<{token: string}>(`${this.apiUrl}`, {userName, passwordHash})
            .pipe(
                tap(response => {
                    localStorage.setItem(this.tokenKey, response.token);
                })
            )
    }

    logout(): void{
        localStorage.removeItem(this.tokenKey);
        this.router.navigate([`/login`]);
    }

    isLoggedIn(): boolean{
        return !!localStorage.getItem(this.tokenKey);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
      }
}