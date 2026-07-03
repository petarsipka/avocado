import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Passenger Rights KBS';
  navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/flights', icon: 'flight', label: 'Flight Tracking' },
    { path: '/incident', icon: 'assignment', label: 'Report Incident' },
    { path: '/analysis', icon: 'analytics', label: 'Legal Analysis' },
    { path: '/query', icon: 'psychology', label: 'Legal Query' },
    { path: '/complaints', icon: 'gavel', label: 'Complaints' },
    { path: '/evidence', icon: 'folder', label: 'Evidence' }
  ];
}