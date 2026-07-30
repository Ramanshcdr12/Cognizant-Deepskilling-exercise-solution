import { Component } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  // Component-level provider
  providers: [NotificationService]
})
export class NotificationComponent {
  newMsg = '';

  // Explanation comment as required by Step 67:
  /*
    WHY COMPONENT-LEVEL PROVIDING CREATES A SEPARATE SCOPED INSTANCE:
    - When a service is declared in `@Component({ providers: [...] })`, Angular 
      creates a new child injector associated with that specific component instance.
    - Any constructor injection of `NotificationService` within this component (or 
      its children) will resolve to this new scoped instance, rather than the 
      application-wide singleton instance.
    - If multiple instances of `NotificationComponent` are rendered on the page, 
      each will get its own completely separate, isolated state store, which is 
      destroyed automatically when the component instance is destroyed.
  */
  constructor(private notificationService: NotificationService) {}

  get list(): string[] {
    return this.notificationService.getNotifications();
  }

  sendNotification(): void {
    if (this.newMsg.trim()) {
      this.notificationService.addNotification(this.newMsg.trim());
      this.newMsg = '';
    }
  }

  clearAll(): void {
    this.notificationService.clear();
  }
}
