import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Wallet',
    icon: 'book-outline',
    link: '/dashboard',
    home: true,
  },

  {
    title: 'Settings',
    icon: 'settings-2-outline',
    link: '/dashboard/user/settings',
  },

  // {
  //   title: 'Projetos',
  //   icon: 'file-text-outline',
  //   expanded: true,
  //   pathMatch: 'prefix',
  //   children: [
  //     {
  //       title: 'Criar novo',
  //       icon: 'file-add-outline',
  //       link: '/projetos/novo',
  //     },
  //     {
  //       title: 'Ver todos',
  //       icon: 'menu-2-outline',
  //       link: '/projetos/lista',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tarefas',
  //   icon: 'code-download-outline',
  //   expanded: true,
  //   // data: {
  //   //   permission: 'view',
  //   //   resource: 'task',
  //   // },

  //   pathMatch: 'prefix',
  //   children: [
  //     {
  //       title: 'Minhas tarefas',
  //       link: '/projetos/tarefas',
  //     },
  //     {
  //       title: 'Ver todas',
  //       icon: 'menu-2-outline',

  //       link: '/projetos/tarefas/lista',
  //     },
  //   ],
  // },
  // {
  //   title: 'Classificação',
  //   icon: 'briefcase-outline',
  //   link: '/projetos/classificacao/lista',
  // },
  // {
  //   title: 'Contato',
  //   icon: 'briefcase-outline',
  //   link: '/projetos/contato/lista',
  // }
];
