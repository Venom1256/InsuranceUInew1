import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { AgentSidebarComponent } from '../../shared/agent-sidebar/agent-sidebar';

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AgentSidebarComponent],
  templateUrl: './agent-layout.html',
  styleUrls: ['./agent-layout.scss']
})
export class AgentLayoutComponent { }