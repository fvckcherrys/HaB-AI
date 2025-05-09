import { Component, OnInit } from '@angular/core';
import { ChatCardComponent } from '../chat-card/chat-card.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { firstValueFrom } from 'rxjs';

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
export class MainContentComponent implements OnInit {
  messages: ChatMessage[] = [];
  userInfo: any;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  onCardClick(message: string) {
    this.sendMessage(message);
  }

  async sendMessage(message: string) {
    this.messages.push({ text: message, sender: 'user' });
    const data = await firstValueFrom(
      this.chatService.sendMessage({ message: message })
    );
    this.messages.push({ text: data.response, sender: 'ai' });
  }
}
