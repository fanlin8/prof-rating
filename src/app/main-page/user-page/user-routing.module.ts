import { UserPageComponent } from './user-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserBoardComponent } from "./user-board/user-board.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

const userRoutes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: 'board', component: UserBoardComponent },
      { path: 'profile', component: UserProfileComponent },
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class UserRoutingModule { }
