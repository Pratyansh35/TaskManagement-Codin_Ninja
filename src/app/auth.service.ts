import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth)
  constructor() { }

  register(email: string, password: string){
    let promise = createUserWithEmailAndPassword(
      this.auth, email, password
    )

    return from(promise)
  }
}
