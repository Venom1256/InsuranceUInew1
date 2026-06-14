import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { CustomerSidebarComponent } from '../../shared/customer-sidebar/customer-sidebar';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CustomerSidebarComponent],
  templateUrl: './customer-layout.html',
  styleUrls: ['./customer-layout.scss']
})
export class CustomerLayoutComponent { }