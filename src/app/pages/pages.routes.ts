import { Routes } from '@angular/router';
import { Comptes } from './comptes/comptes';

export default [
    
    { path: 'comptes', component: Comptes },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
