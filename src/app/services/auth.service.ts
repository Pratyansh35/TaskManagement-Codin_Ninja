import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import { GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup, EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { from } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth);
  user$ = user(this.auth);
  currentUser = signal<null | undefined | UserModel>(null);

  constructor() { }

  register(email: string, password: string) {
    let promise = createUserWithEmailAndPassword(
      this.auth, email, password
    );

    return from(promise);
  }

  login(email: string, password: string) {
    let promise = signInWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  ContinueWithGithub() {
    let githubProvider = new GithubAuthProvider();
    return from(signInWithPopup(this.auth, githubProvider));
  }

  linkEmailPasswordWithGithub(email: string, password: string) {
    let githubProvider = new GithubAuthProvider();
    return from(signInWithPopup(this.auth, githubProvider).then(async (result) => {
      const user = result.user;
      if (user.email) { // Ensure user.email is not null or undefined
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(user, credential);
        this.currentUser.set({
          uid: user.uid,
          displayName: user.displayName || 'Anonymous',
          email: user.email,
          photoURL: user.photoURL || 'default-avatar-url'
        });
      } else {
        throw new Error('User email is not available.');
      }
    }));
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
