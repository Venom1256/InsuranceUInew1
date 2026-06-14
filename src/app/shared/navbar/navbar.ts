import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {

  email = '';
  role = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = this.tokenService.getEmail();
    this.role = this.tokenService.getRole();
  }

  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }
}