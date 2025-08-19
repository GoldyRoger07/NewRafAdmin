import { Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { Compte } from '../models/Compte';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LocalDBService } from './local-dbservice';
import { CompteService } from './compte-service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private currentSenderSource$!:BehaviorSubject<Compte> 
  private currentReceiverSource$!:BehaviorSubject<Compte> 

  currentSender$!:Observable<Compte> 

  currentReceiver$!:Observable<Compte> 

  private messagesSource$!:BehaviorSubject<Message[]>

  messages$!:Observable<Message[]> 

  private indexSource$ = new BehaviorSubject<number>(0)

  currentIndex$ = this.indexSource$.asObservable()


  constructor(private localDBService:LocalDBService,private compteService:CompteService){
      this.currentSenderSource$ = new BehaviorSubject<Compte>(compteService.getCompteById("ID2") as Compte)
      this.currentReceiverSource$ = new BehaviorSubject<Compte>(compteService.getCompteById("ID1") as Compte)

      this.currentSender$ = this.currentSenderSource$.asObservable()
      this.currentReceiver$ = this.currentReceiverSource$.asObservable()

      this.messagesSource$ = new BehaviorSubject<Message[]>(this.getMessages())

      this.messages$ = this.messagesSource$.asObservable()
  }

  changeIndex(id:number){
    this.indexSource$.next(id)
  }

  getMessages(){
    return this.localDBService.getMessages()
  }

  updateCurrentSender(idSender:string){
    this.currentSenderSource$.next(this.compteService.getCompteById(idSender) as Compte)
  }

  updateCurrentReceiver(idReceiver:string){
    this.currentReceiverSource$.next(this.compteService.getCompteById(idReceiver) as Compte)
  }

  updateMessages(){
    this.messagesSource$.next(this.getMessages())
  }

  createMessage(message:Message){
    this.localDBService.saveMessage(message)
    this.updateMessages()
  }

  getMessageById(id:number){
     this.localDBService.getMessageById(id)
  }

  getMessagesBySenderAndReceiver(idSender:string,idReceiver:string){
    return (message:Message) => {
      const testSender = message.sender.idCompte === idSender || idReceiver === message.sender.idCompte
      const testReceiver = message.receiver.idCompte === idReceiver || message.receiver.idCompte === idSender
      
      return testSender && testReceiver 
    }
    
  }

  // getLastMessageOf(sender:Compte,receiver:Compte){
  //   const lastMessage$ = new Observable<Message>(observer=>{
  //       this.getMessagesBySenderAndReceiver(sender,receiver).subscribe((messages)=>{
  //           observer.next(this.sortMessagesByDate(messages,"DESC")[0])
  //       })
  //   })

  //   return lastMessage$
    
  // }

  getDiscussionsBySenders(id1:string){
    
  }

  sortMessagesByDate(order:"ASC"|"DESC"){
    return (a:Message,b:Message)=>{
            const date1 = new Date(a.createdAt)
            const date2 = new Date(b.createdAt)
            if(order === "ASC")
              return  date1.getTime() - date2.getTime()
            else
              return  date2.getTime() - date1.getTime()
    }
  }

  deleteMessageById(id:number){
    this.localDBService.deleteMessage(id)
  }

  deleteMessageByIds(ids:number[]){
    ids.forEach(id => this.deleteMessageById(id))
  }



  
}
