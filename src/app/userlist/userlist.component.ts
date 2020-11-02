import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users = null;
  constructor(private accountService: AccountService) {}

    ngOnInit() {
      this.accountService.getAll()
          .pipe(first())
          .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }

}
