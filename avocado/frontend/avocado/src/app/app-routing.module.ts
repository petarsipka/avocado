import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlightTrackerComponent } from './components/flight-tracker/flight-tracker.component';
import { IncidentWizardComponent } from './components/incident-wizard/incident-wizard.component';
import { LegalAnalysisComponent } from './components/legal-analysis/legal-analysis.component';
import { QueryBuilderComponent } from './components/query-builder/query-builder.component';
import { ComplaintTrackerComponent } from './components/complaint-tracker/complaint-tracker.component';
import { EvidenceCollectionComponent } from './components/evidence-collection/evidence-collection.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'flights', component: FlightTrackerComponent },
  { path: 'incident', component: IncidentWizardComponent },
  { path: 'analysis', component: LegalAnalysisComponent },
  { path: 'query', component: QueryBuilderComponent },
  { path: 'complaints', component: ComplaintTrackerComponent },
  { path: 'evidence', component: EvidenceCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }