import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
// import {OrdersComponent} from "./orders/orders.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
// import {FriendsComponent} from "./friends/friends.component";
// import {GroupsComponent} from "./groups/groups.component";
// import {AddOrderComponent} from "./add-order/add-order.component";
// import {OrderDetailsComponent} from "./order-details/order-details.component";
//
// import {AuthGuard} from "./_guards/auth.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
  // { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  // { path: 'add-order', component: AddOrderComponent, canActivate: [AuthGuard]},
  // { path: 'order-details/:id', component: OrderDetailsComponent },
  // { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
