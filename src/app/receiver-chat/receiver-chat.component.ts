import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat-service';

@Component({
  selector: 'app-receiver-chat',
  templateUrl: './receiver-chat.component.html',
  styleUrls: ['./receiver-chat.component.scss']
})
export class ReceiverChatComponent implements OnInit {

  public receiverChatMessage: string = '';
  public senderChatMessage = [];
  public receiverDetails: any;

  constructor(private chatService: ChatService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.receiverDetails = JSON.parse(localStorage.getItem('receiverEmployee'));
    this.cdRef.markForCheck();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.chatService.receiverRowData.subscribe(data => {
        this.cdRef.markForCheck();
        if (data) {
          this.receiverDetails = data;
        }
      })

      this.chatService.chatMessage.subscribe(data => {
        this.cdRef.markForCheck();
        if (data != '') {
          this.senderChatMessage.push(data);
        }
        else {
          this.senderChatMessage = [];
        }
      });
    }, 200);

  }

  enterCallEvent(event: any) {
    if (event.keyCode == 13) {
      this.sendChatBMessage();
    }
  }

  sendChatBMessage() {
    this.chatService.getChatBMessage(this.receiverChatMessage);
    this.receiverChatMessage = '';
  }
}
