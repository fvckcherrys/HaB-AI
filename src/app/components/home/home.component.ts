import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatCardComponent } from '../chat-card/chat-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SidebarComponent,
    UserProfileComponent,
    MainContentComponent,
    ChatInputComponent,
    ChatCardComponent,
  ],
  template: `
    <div class="app-container">
      <app-sidebar></app-sidebar>
      <div class="main-content-container">
        <app-user-profile></app-user-profile>
        <app-main-content></app-main-content>
      </div>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        height: 100vh;
        background: linear-gradient(120deg, #f8e1ff 0%, #e3f0ff 100%);
      }

      .main-content-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 32px 0 0 0;
      }
    `,
  ],
})
export class HomeComponent {}
