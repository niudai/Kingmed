import { HomeComponent } from './../../home/home.component';
import { Route, Routes } from '@angular/router';

import { NavbarComponent } from './navbar.component';

export const navbarRoute: Routes = [
    {
        path: '',
        component: NavbarComponent,
        outlet: 'navbar'
    }
];
