import { Component } from '@angular/core';
import { ChatCardComponent } from '../chat-card/chat-card.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule, NgClass, NgFor } from '@angular/common';

interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
}

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  standalone: true,
  imports: [ChatCardComponent, ChatInputComponent, CommonModule],
})
export class MainContentComponent {
  messages: ChatMessage[] = [];

  sendMessage(message: string) {
    this.messages.push({ text: message, sender: 'user' });
    setTimeout(() => {
      this.messages.push({
        text: 'This is a simulated AI response to: ' + message,
        sender: 'ai',
      });
    }, 1000);
  }
}
