import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: './one-column.layout.component.html',
})
export class OneColumnLayoutComponent implements OnInit, OnDestroy {
  public version: string = environment.appVersion;
  private destroy$: Subject<void> = new Subject<void>();
  currentTheme = 'lb2';
  closedChat = true;

  constructor(private themeService: NbThemeService) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reciverEvent(e) {
    if (e === 'closeChat') {
      this.closedChat = !this.closedChat;
    }
  }
  toggleChat() {
    this.closedChat = !this.closedChat;
  }
}
