import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ChatService {

    public chatMessage = new BehaviorSubject<string>('');
    public chat2Message = new BehaviorSubject<string>('');
    public receiverRowData = new BehaviorSubject<any>('');

    constructor() {
    }

    getMessage(name: string) {
        this.chatMessage.next(name);
    }

    getChatBMessage(name: string) {
        this.chat2Message.next(name);
    }

    getReceiverRowData(row: any) {
        this.receiverRowData.next(row);
    }
}