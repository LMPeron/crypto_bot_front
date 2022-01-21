import { NgModule } from '@angular/core';

import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard } from './@auth/auth-guard.service';
// import { PermGuard } from './@auth/perm-guard.service';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./@auth/auth.module').then((m) => m.NgxAuthModule),
  },

  // {
  //   path: 'adm',
  //   canActivate: [AuthGuard, PermGuard],
  //   loadChildren: () => import('./adm/adm.module').then((m) => m.AdmModule),
  //   data: { preload: true },
  // },
  {
    path: '**',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
];

const config: ExtraOptions = {
  useHash: false,
  relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
