import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../models/Message';
import { CommonModule, DatePipe } from '@angular/common';
import { Compte } from '../../models/Compte';
import { MessageService } from '../../services/message-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'discu-block',
  imports: [CommonModule],
  template: `
  @let currentReceiver = currentReceiver$ | async;
    <div (click)="onClick()" class="block-discussion p-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[var(--p-surface-800)]   rounded-lg {{currentReceiver?.idCompte === receiver.idCompte?activeClass:'' }} ">
          <img class="w-[50px] rounded-full" [src]="receiver.urlPhotoProfile" alt="profile-user" >
          <div class="flex flex-col w-full">
              <div class="flex justify-between">
                  <span class="font-bold">{{receiver.username}}</span>
              </div>
              <p class="text-gray-500 truncate w-[220px]">write a message...</p>
          </div>
    </div>
  `,
  styles: `

      .block-discussion:hover{
        opacity: 0.7;
      }
      .block-discussion:active{
        opacity: 0.85;
      }

      
      .block-discussion{
        transition: all ease-in-out 100ms;
      }
  `
})
export class DiscuBlock{
  @Input()
  receiver = new Compte()


  currentReceiver$!: Observable<Compte>

  activeClass = "bg-gray-100 dark:bg-[var(--p-surface-800)]"

  onClick(){

    this.messageService.updateCurrentReceiver(this.receiver.idCompte)
  }

  constructor(private messageService:MessageService){
    this.currentReceiver$ = messageService.currentReceiver$
  }

}
