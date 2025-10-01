import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../Shared/Models/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Jane Customer', email: 'jane@example.com', role: 'customer' },
    { id: 2, name: 'Adam Admin', email: 'adam@example.com', role: 'admin' },
    { id: 3, name: 'Bob Buyer', email: 'bob@example.com', role: 'customer' },
  ];

  getUsers(): Observable<User[]> { return of(this.users); }
  getUser(id: number): Observable<User | undefined> { return of(this.users.find(u => u.id === id)); }

  updateUser(user: User): Observable<User> {
    const idx = this.users.findIndex(u => u.id === user.id);
    if (idx !== -1) this.users[idx] = { ...user };
    return of(user);
  }

  deleteUser(id: number): Observable<boolean> {
    this.users = this.users.filter(u => u.id !== id);
    return of(true);
  }
}
