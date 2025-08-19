import { Component, Input } from '@angular/core';
import { Message } from '../../models/Message';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'chat-block',
  imports: [DatePipe],
  template: `
    <div class="max-w-[350px] shadow w-fit px-3 py-[1px] rounded-lg  flex flex-col shrink-0 {{type === 'SENDER'?senderClass:receiverClass}}" >
          <p class="text-start " style="margin-bottom: 0!important;">
              {{message.content}}
          </p>
          <span class="ml-auto mt-auto text-xs ">{{message.createdAt | date:'h:mm a'}}</span>
    </div>
  `,
  styles: ``
})
export class ChatBlock {
  @Input()
  message = new Message()

  @Input()
  type:"SENDER"|"RECEIVER" = "SENDER"

  senderClass = "bg-amber-100 dark:bg-gray-900 ml-auto"

  receiverClass = "bg-white dark:bg-[var(--p-surface-800)] mr-auto"
}
