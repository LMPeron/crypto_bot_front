import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { map, takeUntil, tap, share } from 'rxjs/operators';
import { Subject, Subscription, Observable } from 'rxjs';
import { NbAuthExtendedService } from 'src/app/@auth/nb-auth-extended.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';
import { IWorkspace } from 'src/app/@core/data/workspace';
import { WorkSpaceService } from 'src/app/@core/services/workspace.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  userPictureOnly = false;
  showAlerts = false;
  user: any;
  unreadNotifications = 0;
  alertList: any;
  query: string;
  subscription: Subscription;
  userPicture: any;
  workspaceList: IWorkspace[] = [];
  currentWorkspace: IWorkspace;
  currentWorkspace$: Observable<IWorkspace>;
  currentWorkspaceList$: Observable<IWorkspace[]>;
  userMenu = [
    {
      title: 'Alterar perfil',
      link: '/pages/alterarPerfil',
    },
    {
      title: 'Alterar senha',
      link: '/pages/alterarSenha',
    },
    {
      title: 'Sair',
      icon: 'log-in-outline',
      data: 'logout',
      link: '/auth/logout',
    },
  ];
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthExtendedService,
    private router: Router,
    private userService: UserService,
    private workspaceService: WorkSpaceService,
  ) {

    this.user = this.authService.currentUserValue;

  }

  ngOnInit() {

    this.currentWorkspaceList$ = this.workspaceService.getByUser().pipe(
      tap(data => this.currentWorkspace = data[0]),
      share()

    );

    this.getUser();
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$)
      )
      .subscribe((isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl));

    const { sm } = this.breakpointService.getBreakpointsMap();

    this.menuService
      .onItemSelect()
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: { tag: string; item: any }) => {
        if (document.documentElement.clientWidth < sm) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  mouseOver() {
    // console.log('over');
    this.showAlerts = true;
  }
  mouseOut() {
    // console.log('out');
    this.showAlerts = false;
  }

  doFilter(event: Event) {
    const data = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    if (data.length < 4) {
      return;
    }

    this.router.navigate(['/projetos/pesquisa/', data]);
  }

  getUser() {
    this.userService.getOne(this.authService.currentUserValue.id).subscribe(
      (res) => {
        this.user = res;
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getWorkspacesByUser(): void {

    this.workspaceService.getByUser().subscribe(
      (res) => {
        this.workspaceList = res;
        // if (this.currentWorkspace?.id === undefined)
        // {
        //   this.currentWorkspace = res[0]
        // }
      },
      (err) => {
        console.log(err);
      }
    );


  }

  changeWorkspace(workwpaceID: IWorkspace) {
    this.workspaceService.changeWorkspace(workwpaceID);
  }

}
