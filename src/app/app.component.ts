import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatCardComponent } from './components/chat-card/chat-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
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
})
export class AppComponent {
  title = 'HaB-AI';
}
