import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReasoningService } from '../../services/reasoning.service';
import { Right } from '../../models/legal.model';

@Component({
  selector: 'app-custom-rules',
  templateUrl: './custom-rules.component.html',
  styleUrls: ['./custom-rules.component.css']
})
export class CustomRulesComponent {

  form: FormGroup;
  rights?: Right[];
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private reasoningService: ReasoningService) {
    this.form = this.fb.group({
      minDelayHours: [2, [Validators.required, Validators.min(0)]],
      article: ['Custom rule', Validators.required],
      description: ['Care right above custom threshold', Validators.required],
      testDelayHours: [3, [Validators.required, Validators.min(0)]]
    });
  }

  apply() {
    const v = this.form.value;
    this.loading = true;
    this.error = '';
    this.rights = undefined;

    this.reasoningService.applyThreshold(
      Number(v.minDelayHours), v.article, v.description, Number(v.testDelayHours)
    ).subscribe({
      next: (rights) => {
        this.rights = rights;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Backend request failed. Is the backend running on port 8080?';
        this.loading = false;
        console.error('[CustomRules] request failed', err);
      }
    });
  }
}
