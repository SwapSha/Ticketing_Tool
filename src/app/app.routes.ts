import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DepartmentComponent } from './pages/department/department.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { ParentCategoryComponent } from './pages/parent-category/parent-category.component';
import { CategoryComponent } from './pages/category/category.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '', component: LayoutComponent,
        children:[
            {path:'dashboard',component:DashboardComponent},
            {path:'department',component:DepartmentComponent},
            {path:'employee',component:EmployeeComponent},
            {path:'category',component:CategoryComponent},
            {path:'employee',component:EmployeeComponent},
            {path:'parent-category',component:ParentCategoryComponent},
            {path:'new-ticket',component:NewTicketComponent},
            {path:'ticket-list',component:TicketListComponent},
        ]
    },
    {path:'**',component:Error404Component}
];
