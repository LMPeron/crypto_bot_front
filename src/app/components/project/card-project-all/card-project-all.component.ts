import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-card-project-all',
  templateUrl: './card-project-all.component.html',
  styleUrls: ['./card-project-all.component.scss'],
})
export class CardProjectAllComponent implements OnInit {
  // TODO ENUM
  @Input() type: string;
  @Input() size = 0;
  openTicket: 0;
  loading = false;

  constructor() {}

  ngOnInit(): void {}
}
