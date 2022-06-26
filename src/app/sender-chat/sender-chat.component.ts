import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat-service';

@Component({
  selector: 'app-sender-chat',
  templateUrl: './sender-chat.component.html',
  styleUrls: ['./sender-chat.component.scss']
})
export class SenderChatComponent implements OnInit {

  public senderChatMessage: string = '';
  public receiverChatMessage = [];
  public senderDetails: any;

  constructor(private chatService: ChatService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.senderDetails = JSON.parse(localStorage.getItem('senderRowData'));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.chatService.chat2Message.subscribe(data => {
        this.cdRef.markForCheck();
        if (data != '') {
          this.receiverChatMessage.push(data);
        }
        else {
          this.receiverChatMessage = [];
        }
      });
    }, 200);
  }

  enterCallEvent(event: any) {
    if (event.keyCode == 13) {
      this.sendMesage();
    }
  }

  sendMesage() {
    this.chatService.getMessage(this.senderChatMessage);
    this.senderChatMessage = '';
  }

}
