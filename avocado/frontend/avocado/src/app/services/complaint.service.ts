import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ComplaintService {
  // NOT USED: Complaint tracking is not integrated with backend yet
  // complaint-tracker component uses hardcoded mock complaints
  // Backend endpoints (when needed): GET /api/complaints, POST /api/complaints, GET /api/complaints/{id}, PATCH /api/complaints/{id}
}
