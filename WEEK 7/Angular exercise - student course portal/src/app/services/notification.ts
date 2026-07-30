import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private notifications: string[] = [];

  constructor() {
    console.log('NotificationService Instance Created!');
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  addNotification(message: string): void {
    this.notifications.push(message);
  }

  clear(): void {
    this.notifications = [];
  }
}
