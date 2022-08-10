import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/model/user/user';
import { UserRegister } from 'src/app/model/user/user-register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<User> {
    return from(
      this.auth.signInWithEmailAndPassword(email, password)
        .then(user => ({
          email,
          id: user?.user?.uid || ""
        } as User))
        .catch(this.translateFirebaseError)
    )
  }

  loginByToken(): Observable<User> {
    return new Observable<User>(observer => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          observer.next({
            email: user.email,
            id: user.uid
          })
        } else {
          observer.error({});
        }
        observer.complete();
      })
    })
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  recoverPassword(email: string): Observable<void> {
    return from(
      this.auth.sendPasswordResetEmail(email)
        .catch(this.translateFirebaseError)
    );
  }

  register(userRegister: UserRegister): Observable<{token: string}> {
    const url = `${environment.api}/register`;
    return this.http.post<{token: string}>(url, userRegister)
      .pipe(
        catchError(error => this.translateFirebaseError(error.error))
      );
  }

  private translateFirebaseError(error: {code: string}) {
    if (!error.code) {
      return Promise.reject(error);
    }
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      return Promise.reject({message: 'Email e/ou senha nao encontrados.'});
    }
    if (error.code.includes("auth/requests-from-referer") && error.code.includes("-are-blocked")) {
      return Promise.reject({message: 'Tentativa de acesso bloqueada.'});
    }
    if (error.code === "auth/email-already-exists") {
      return Promise.reject({message: 'Email já está sendo utilizado por outra conta.'});
    }
    return Promise.reject(error);
  }

}
