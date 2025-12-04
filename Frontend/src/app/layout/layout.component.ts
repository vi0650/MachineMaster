import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private router: Router, private dialog: MatDialog) {
    console.log('layout module load');

    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  protected readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  @ViewChild('snav') snav: any;
  closeSidebar() { if (this.isMobile()) { this.snav.close();}}

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  isSidebarOpen = true;

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
