import { Component } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
  planoAtual = '';
  constructor() {
  }

  // ngOnInit() {
  //   this.authMenuItems();
  // }

  // authMenuItems() {
  // this.menu.forEach((item) => {
  //   this.authMenuItem(item);
  // });
  // }

  // authMenuItem(menuItem: NbMenuItem) {
  //   if (menuItem.data && menuItem.data.permission && menuItem.data.resource) {
  //     if (this.planoAtual === null && menuItem.data.resource === 'upgrade') {
  //       menuItem.hidden = true;
  //     }

  //     if (menuItem.data.resource === 'adm') {
  //       if (!this.authService.currentUserValue.perms.includes('P_13')) {
  //         menuItem.hidden = true;
  //       }
  //     }
  //     if (menuItem.data.resource === 'report') {
  //       if (!this.authService.currentUserValue.perms.includes('P_20')) {
  //         menuItem.hidden = true;
  //       }
  //     }
  //     if (menuItem.data.resource === 'task') {
  //       if (!this.authService.currentUserValue.perms.includes('P_14')) {
  //         menuItem.hidden = true;
  //       }
  //     }

  //     if (menuItem.data.resource === 'survey') {
  //       menuItem.children.map((x) => {
  //         if (x.data?.resource === 'search') {
  //           if (!this.authService.currentUserValue.perms.includes('P_40')) {
  //             x.hidden = true;
  //           }
  //         }
  //       });
  //     }
  //   }
  // }
}
