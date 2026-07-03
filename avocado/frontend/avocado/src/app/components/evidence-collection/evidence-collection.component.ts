import { Component } from '@angular/core';

interface EvidenceCategory {
  category: string;
  items: { type: string; description: string; importance: string; tip: string }[];
}

@Component({
  selector: 'app-evidence-collection',
  templateUrl: './evidence-collection.component.html',
  styleUrls: ['./evidence-collection.component.css']
})
export class EvidenceCollectionComponent {
  categories: EvidenceCategory[] = [
    {
      category: 'Flight Documentation',
      items: [
        { type: 'Boarding Pass', description: 'Original boarding pass for all flight segments', importance: 'CRITICAL', tip: 'Take photo immediately after boarding' },
        { type: 'Booking Confirmation', description: 'Email or ticket confirmation', importance: 'CRITICAL', tip: 'Forward to dedicated email folder' },
        { type: 'Flight Status Screenshots', description: 'Screenshots of airport displays showing delay/cancellation', importance: 'CRITICAL', tip: 'Capture time and date visible on screen' }
      ]
    },
    {
      category: 'Airline Communications',
      items: [
        { type: 'Cancellation Notice', description: 'Email/SMS from airline about cancellation', importance: 'CRITICAL', tip: 'Note exact time of notification' },
        { type: 'Delay Announcements', description: 'Written announcements at gate', importance: 'HIGH', tip: 'Photograph airport displays' },
        { type: 'Voucher Offers', description: 'Any voucher or alternative offers', importance: 'HIGH', tip: 'Do NOT accept without written consent advice' }
      ]
    },
    {
      category: 'Expense Receipts',
      items: [
        { type: 'Food & Drink', description: 'Meals during delay', importance: 'HIGH', tip: 'Keep all receipts, reasonable amounts only' },
        { type: 'Hotel', description: 'If airline refused hotel and you booked yourself', importance: 'HIGH', tip: 'Must be reasonable standard, close to airport' },
        { type: 'Transport', description: 'Taxi/bus between airport and hotel', importance: 'MEDIUM', tip: 'Keep receipts, use reasonable routes' },
        { type: 'Phone/Internet', description: 'Communication costs', importance: 'MEDIUM', tip: 'Phone bills showing international calls' }
      ]
    },
    {
      category: 'Special Circumstances',
      items: [
        { type: 'Medical Documents', description: 'If health affected by delay', importance: 'HIGH', tip: 'Doctor note if applicable' },
        { type: 'Downgrade Evidence', description: 'Seat assignment showing lower class', importance: 'CRITICAL', tip: 'Photo of seat, boarding pass class code' }
      ]
    }
  ];
}