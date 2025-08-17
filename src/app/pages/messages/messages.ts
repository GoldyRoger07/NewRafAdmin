import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TextareaModule } from 'primeng/textarea';
import { PopoverModule } from 'primeng/popover';
import { Message } from '../../models/Message';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from "primeng/inputtext";

interface MessageSetting{
  usersOption: boolean;
  agentsOption: boolean;
  emailOption: boolean;
  pushOption: boolean;
}

@Component({
  selector: 'app-messages',
  imports: [ButtonModule, TextareaModule, PopoverModule, FormsModule, Checkbox, InputText],
  templateUrl: './messages.html',
  styleUrl: './messages.scss'
})
export class Messages {
  messageSetting: MessageSetting = {
    usersOption: false,
    agentsOption: false,
    emailOption: true,
    pushOption: false
  }
}
