import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DepartmentComponent } from './pages/department/department.component';
import { Error404Component } from './pages/error-404/error-404.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '', component: LayoutComponent,
        children:[
            {path:'dashboard',component:DashboardComponent},
            {path:'department',component:DepartmentComponent},
            {path:'employee',component:EmployeeComponent},
        ]
    },
    {path:'**',component:Error404Component}
];
