import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'ngx-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss'],
})
export class UserConfigComponent implements OnInit {

  dataSourceAll: any
  activeForm = false

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.userService.getAllUsers().subscribe(
      (res) => {
        console.log(res)
        this.dataSourceAll = new MatTableDataSource<any>(res);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  startForm() { this.activeForm = true }

  manageForm(e: any) {
    if (e) this.getData()
    this.activeForm = false
  }
}
