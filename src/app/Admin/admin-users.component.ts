import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/Models/User';
import { UserService } from '../Core/Services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.usersService.getUsers().subscribe(u => this.users = u);
  }

  save(user: User) {
    this.usersService.updateUser(user).subscribe(() => this.refresh());
  }

  remove(id: number) {
    this.usersService.deleteUser(id).subscribe(() => this.refresh());
  }
}
