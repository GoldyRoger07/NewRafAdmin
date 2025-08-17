import { Routes } from '@angular/router';
import { Comptes } from './comptes/comptes';
import { Messages } from './messages/messages';

export default [
    
    { path: 'comptes', component: Comptes },
    { path: 'messages', component: Messages },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
