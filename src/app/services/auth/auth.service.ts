import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';

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

  recoverPassword(email: string): Observable<void> {
    return from(
      this.auth.sendPasswordResetEmail(email)
        .catch(this.translateFirebaseError)
    );
  }

  private translateFirebaseError(error: {code: string}) {
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      return Promise.reject({message: 'Email e/ou senha nao encontrados.'});
    }
    if (error.code.includes("auth/requests-from-referer") && error.code.includes("-are-blocked")) {
      return Promise.reject({message: 'Tentativa de acesso bloqueada.'});
    }
    return Promise.reject(error);
  }

}
