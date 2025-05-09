import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
})
export class ChatCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
