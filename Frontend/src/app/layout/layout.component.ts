import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, signal, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {

  private media = inject(MediaMatcher);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private loginData = inject(UserService);

  isMobile = signal(false);
  userName:string="";

  private mobileQuery: MediaQueryList = this.media.matchMedia('(max-width: 600px)');
  private mobileListener = () => this.isMobile.set(this.mobileQuery.matches);

  @ViewChild('snav') snav: any;

  constructor() {
    console.log('Layout module loaded');
    this.isMobile.set(this.mobileQuery.matches);
    this.mobileQuery.addEventListener('change', this.mobileListener);

    const userdata = localStorage.getItem("loggedUser");
    this.userName = (((userdata ? JSON.parse(userdata) : null).role));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileListener);
  }

  closeSidebar() {
    if (this.isMobile() && this.snav) {
      this.snav.close();
    }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login'], { replaceUrl: true });
  }


}
