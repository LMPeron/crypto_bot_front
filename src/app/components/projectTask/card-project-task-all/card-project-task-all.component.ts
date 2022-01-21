import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-card-project-task-all',
  templateUrl: './card-project-task-all.component.html',
  styleUrls: ['./card-project-task-all.component.scss'],
})
export class CardProjectTaskAllComponent implements OnInit {
  // TODO ENUM
  @Input() type: string;
  @Input() size = 0;
  openTicket: 0;
  loading = false;

  constructor() {}

  ngOnInit(): void {}
}
