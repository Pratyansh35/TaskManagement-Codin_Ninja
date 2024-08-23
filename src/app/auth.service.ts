import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import { GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { from } from 'rxjs';
import { UserModel } from './models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth)
  user$ = user(this.auth)
  currentUser = signal<null | undefined | UserModel > (null)
  constructor() { }

  register(email: string, password: string){
    let promise = createUserWithEmailAndPassword(
      this.auth, email, password
    )

    return from(promise)
  }
  login(email: string, password: string){
    let promise = signInWithEmailAndPassword(this.auth, email, password)
    return from(promise)
  }

  ContinueWithGithub(){
    let githubProvider = new GithubAuthProvider()
    return from(signInWithPopup(this.auth, githubProvider))
  }
  signOut(){
    return from(this.auth.signOut())
  }
  
}
