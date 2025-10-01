import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole } from '../../Shared/Models/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  setRole(role: UserRole) {
    const user = this.currentUserSubject.value;
    if (!user) return;
    this.currentUserSubject.next({ ...user, role });
  }

  async login(email: string, _password: string): Promise<void> {
    // Mock login: admin if email contains 'admin'
    const role: UserRole = /admin/i.test(email) ? 'admin' : 'customer';
    const user: User = {
      id: Date.now(),
      name: email.split('@')[0],
      email,
      role,
    } as User;
    this.currentUserSubject.next(user);
  }

  async register(input: { name: string; email: string; password?: string }): Promise<void> {
    // Simulate API call and create a simple user
    const newUser: User = {
      id: Date.now(),
      name: input.name,
      email: input.email,
      role: 'customer',
    } as User;
    this.currentUserSubject.next(newUser);
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}
