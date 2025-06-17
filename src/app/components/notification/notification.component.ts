import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <div 
        *ngFor="let notification of notifications$ | async" 
        class="notification"
        [class]="'notification-' + notification.type"
        (click)="removeNotification(notification.id)"
      >
        <div class="notification-content">
          <i class="notification-icon fas" 
             [class.fa-check-circle]="notification.type === 'success'"
             [class.fa-exclamation-circle]="notification.type === 'error'"
             [class.fa-info-circle]="notification.type === 'info'"
             [class.fa-exclamation-triangle]="notification.type === 'warning'">
          </i>
          <span class="notification-message">{{ notification.message }}</span>
        </div>
        <button class="notification-close" (click)="removeNotification(notification.id)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }

    .notification {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.3s ease-out;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .notification:hover {
      transform: translateX(-5px);
    }

    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .notification-icon {
      font-size: 18px;
    }

    .notification-message {
      flex: 1;
    }

    .notification-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .notification-close:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .notification-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .notification-error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .notification-info {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    .notification-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .notifications-container {
        left: 20px;
        right: 20px;
        max-width: none;
      }
    }
  `]
})
export class NotificationComponent implements OnInit {
  notifications$!: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationService.notifications$;
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }
}