import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000): void {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      duration
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
  }

  success(message: string, duration?: number): void {
    this.showNotification(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.showNotification(message, 'error', duration);
  }

  info(message: string, duration?: number): void {
    this.showNotification(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.showNotification(message, 'warning', duration);
  }
}