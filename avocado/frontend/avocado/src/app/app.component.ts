import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Passenger Rights KBS';
  navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Scenarios' },
    { path: '/incident', icon: 'assignment', label: 'Report Incident' },
    { path: '/analysis', icon: 'analytics', label: 'Legal Analysis' },
    { path: '/query', icon: 'psychology', label: 'Legal Query' },
    { path: '/flights', icon: 'flight', label: 'CEP Simulation' }
  ];
}
