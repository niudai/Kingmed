import { NavigationBackComponent } from './../../shared/navigation/navigation-back.component';
import { HomeComponent } from './../../home/home.component';
import { Route, Routes } from '@angular/router';

import { NavbarComponent } from './navbar.component';

export const navbarRoute: Routes = [
    {
        path: '',
        component: NavbarComponent,
        outlet: 'navbar'
    },
    {
        path: '',
        component: NavigationBackComponent,
        outlet: 'fab'
    }
];
