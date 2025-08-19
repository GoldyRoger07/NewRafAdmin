import { Component, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TextareaModule } from 'primeng/textarea';
import { PopoverModule } from 'primeng/popover';
import { Message } from '../../models/Message';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from "primeng/inputtext";
import { DiscuBlock } from "../../components/discu-block/discu-block";
import { MessageService } from '../../services/message-service';
import { CompteService } from '../../services/compte-service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Compte } from '../../models/Compte';
import { CommonModule } from '@angular/common';
import { ChatBlock } from "../../components/chat-block/chat-block";

interface MessageSetting{
  title: string;
  usersOption: boolean;
  agentsOption: boolean;
  emailOption: boolean;
  pushOption: boolean;
}

@Component({
  selector: 'app-messages',
  imports: [CommonModule, ButtonModule, TextareaModule, PopoverModule, FormsModule,ReactiveFormsModule, Checkbox, InputText, DiscuBlock, ChatBlock],
  templateUrl: './messages.html',
  styleUrl: './messages.scss'
})
export class Messages{
  messageSetting: MessageSetting = {
    title: 'Raf',
    usersOption: false,
    agentsOption: false,
    emailOption: true,
    pushOption: false
  }

  search = new FormBuilder().nonNullable.group({
      name: ['']
  })

  contentInput = ""

  receivers$!: Observable<Compte[]> 

  messages!: Message[]

  messages$!:Observable<Message[]> 

  groupedMessages: { [key: string]: Message[] } = {};

  currentReceiver$!: Observable<Compte>

  currentSender$!:  Observable<Compte>

  datesList:number[] = [0]
  

  constructor(private messageService: MessageService, private compteService:CompteService){
    this.receivers$ = this.getReceivers()
    this.currentReceiver$ = this.messageService.currentReceiver$
    this.currentSender$ = this.messageService.currentSender$
    this.messages$ = this.getMessages()

    

    
   
  }

  formatDate(date:Date){
    date = new Date(date)
    const today = new Date()

    const diffDays = this.getDiffDay(date,today)

    let result;

    if(diffDays === 0)
      result = "Today"
    else if(diffDays === 1)
      result = "Yesterday"
    else
      result = date

    return result
  }

  getDiffDay(date1: Date, date2: Date){
    date1.setHours(0,0,0,0)
    date2.setHours(0,0,0,0)

    const diffTime = date2.getTime() - date1.getTime()

    return diffTime / (1000 * 60 * 60 * 24)
  }

  checkDate(date:Date){
    date = new Date(date)
    
    const diffDays = this.getDiffDay(date,new Date())
    return this.datesList.includes(diffDays)
  }

  addDate(date:Date){
    date = new Date(date)

    
      this.datesList.push(this.getDiffDay(date,new Date()))
  }

  groupByDate(messages: Message[] | null) {
      const groups: { [key: string]: Message[] } = {};

      messages?.forEach(msg => {
        const date = new Date(msg.createdAt).toLocaleDateString("fr-FR"); // format dd/mm/yyyy
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(msg);
      });

      return groups;
  }

  sendMessage(sender:Compte | null,receiver:Compte | null){
    const message = new Message()

    message.content = this.contentInput

    message.title = this.messageSetting.title

    message.sender = sender as Compte
    message.receiver = receiver as Compte

    
    this.messageService.createMessage(this.getMessageState(message))
    this.contentInput = ""
    
  }

  getMessageState(message:Message){
    if(this.messageSetting.pushOption)
      message.type = "BOTH"

    if(this.messageSetting.usersOption)
      message.receiverType = "USERS"

    if(this.messageSetting.agentsOption)
      message.receiverType = "AGENTS"

    if(this.messageSetting.usersOption && this.messageSetting.agentsOption)
      message.receiverType = "BOTH"
    
    if(!this.messageSetting.usersOption && !this.messageSetting.agentsOption!)
      message.receiverType = "USER"
    
    return message
  }

  compareDesc = (a: any, b: any): number => {
    // convertir en date pour comparer
    const dateA = new Date(a.key.split('/').reverse().join('-')).getTime();
    const dateB = new Date(b.key.split('/').reverse().join('-')).getTime();
    return dateB - dateA; // tri descendant (du plus récent au plus ancien)
  }

  getMessages():Observable<Message[]>{

    const messages$ = this.messageService.messages$
    const currentSender$ = this.messageService.currentSender$
    const currentReceiver$ = this.messageService.currentReceiver$
    
    
    return combineLatest([messages$,currentReceiver$,currentSender$]).pipe(
      map(([messages,currentReceiver,currentSender]) => {

        return messages
                .filter(this.messageService.getMessagesBySenderAndReceiver(currentSender.idCompte,currentReceiver.idCompte))
                .sort(this.messageService.sortMessagesByDate("DESC"))
      })
    )
  }

  getReceivers(){
    const receivers$ = this.compteService.getComptesWithout("ID2")
    const search$ = this.search.controls['name'].valueChanges.pipe(startWith(''))

    return combineLatest([receivers$,search$])
           .pipe(map(([receivers,searchValue])=>{
              return receivers.filter(r => r.username.toLowerCase().includes(searchValue.toLowerCase())) 
           }))


  }
  
}
