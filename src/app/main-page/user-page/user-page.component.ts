import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserImpl } from '../../models/userImpl';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: UserImpl;
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authService.getMe().subscribe(res => {
      if (res) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    this.user = this.authService.currentUser;
  }

  private buttonToggled(value): void {
    this.router.navigate([value], { relativeTo: this.route });
  }

}
