import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlightTrackerComponent } from './components/flight-tracker/flight-tracker.component';
import { IncidentWizardComponent } from './components/incident-wizard/incident-wizard.component';
import { LegalAnalysisComponent } from './components/legal-analysis/legal-analysis.component';
import { QueryBuilderComponent } from './components/query-builder/query-builder.component';
import { ComplaintTrackerComponent } from './components/complaint-tracker/complaint-tracker.component';
import { EvidenceCollectionComponent } from './components/evidence-collection/evidence-collection.component';
import { NotificationPanelComponent } from './components/notification-panel/notification-panel.component';
import { ReplaceUnderscorePipe } from './pipes/replace-underscore.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FlightTrackerComponent,
    IncidentWizardComponent,
    LegalAnalysisComponent,
    QueryBuilderComponent,
    ComplaintTrackerComponent,
    EvidenceCollectionComponent,
    NotificationPanelComponent,
    ReplaceUnderscorePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDividerModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
