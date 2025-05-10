import { Component, OnInit } from '@angular/core';
import { ChatCardComponent } from '../chat-card/chat-card.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { firstValueFrom } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ChatMessage {
  text: string | SafeHtml;
  sender: 'user' | 'ai';
  isHtml?: boolean;
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

  constructor(
    private chatService: ChatService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (this.userInfo.username) {
      this.userInfo.username = this.capitalizeFirstLetter(
        this.userInfo.username
      );
    }
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onCardClick(message: string) {
    this.sendMessage(message);
  }

  private makeLinksClickable(text: string): SafeHtml {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const html = text.replace(
      urlRegex,
      (url) =>
        `<a href="${url}" target="_blank" style="color: inherit; text-decoration: underline;">${url}</a>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  async sendMessage(message: string) {
    this.messages.push({ text: message, sender: 'user' });
    const data = await firstValueFrom(
      this.chatService.sendMessage({ message: message })
    );

    if (data.link) {
      this.messages.push({
        text: this.makeLinksClickable(data.response),
        sender: 'ai',
        isHtml: true,
      });
    } else {
      this.messages.push({ text: data.response, sender: 'ai', isHtml: false });
    }
  }
}
