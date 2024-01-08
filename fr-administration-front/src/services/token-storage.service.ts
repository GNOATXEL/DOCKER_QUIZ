import { Injectable } from '@angular/core';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public clear(): void {
    localStorage.clear();
  }
  public save(token: string, id: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY );
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY,id);
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
  }
  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }

  public getId(): string {
    const id = localStorage.getItem(USERNAME_KEY);
    return id === null ? '' : id;
  }
  public isLogged(): boolean {
    console.log(localStorage.getItem(IS_LOGGED_IN));
    return (Boolean)(localStorage.getItem(IS_LOGGED_IN));
  }
}
