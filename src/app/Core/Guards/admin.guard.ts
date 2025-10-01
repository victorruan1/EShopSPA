import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private account: AccountService) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | boolean {
    return this.account.currentUser$.pipe(
      take(1),
      map(user => user?.role === 'admin')
    );
  }
}
