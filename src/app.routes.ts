import { Routes } from '@angular/router';
import { Notfound } from './app/pages/notfound/notfound';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';

export const routes: Routes = [

    { path: '',
      component: AppLayout,
      children: [
        { path: '', component: Dashboard },
        { path: 'pages', loadChildren: () => import('./app/pages/pages.routes')}
      ]
    },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
]
