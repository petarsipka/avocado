import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LegalQualification } from '../../models/legal.model';

@Component({
  selector: 'app-legal-analysis',
  templateUrl: './legal-analysis.component.html',
  styleUrls: ['./legal-analysis.component.css']
})
export class LegalAnalysisComponent implements OnInit {
  qualification?: LegalQualification;
  facts?: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.qualification = nav?.extras?.state?.['qualification'];
    this.facts = nav?.extras?.state?.['facts'];
  }

  ngOnInit() {}

  startComplaint() {
    this.router.navigate(['/complaints']);
  }
}