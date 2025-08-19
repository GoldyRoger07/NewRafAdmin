import { Injectable } from '@angular/core';
import { Compte } from '../models/Compte';
import { Message } from '../models/Message';
import { BehaviorSubject, Observable } from 'rxjs';

interface LocalDB{
  compteTable: {
    idCounter: number;
    comptes: Compte[];
  };

  messageTable:{
    idCounter: number;
    messages: Message[]
  }

}

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {
  private localDB: LocalDB = {
    compteTable: {
      idCounter: 0,
      comptes: []
    },
    messageTable: {
      idCounter: 0,
      messages: []
    }
  }


  comptes$: BehaviorSubject<Compte[]> = new BehaviorSubject<Compte[]>([])
  

  messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([])

  constructor(){
    if(!localStorage.getItem("localDB")){
      
      localStorage.setItem("localDB",JSON.stringify(this.localDB))
    }

    this.localDB = JSON.parse(localStorage.getItem("localDB") as string) as LocalDB
    this.comptes$.next(this.localDB.compteTable.comptes)
  }

  saveCompte(compte: Compte){
    const comptes = this.localDB.compteTable.comptes
    if(compte.idCompte === ""){
      this.localDB.compteTable.idCounter++
      compte.idCompte = "ID"+this.localDB.compteTable.idCounter
      this.localDB.compteTable.comptes.push(compte)
      
    }else{
        const i = comptes.findIndex(c => c.idCompte === compte.idCompte)
        if(i>=0)
          this.localDB.compteTable.comptes[i] = compte
    }

    this.comptes$.next(this.localDB.compteTable.comptes)
    
    this.save()
  }

  deleteCompte(idCompte: string){
    this.localDB.compteTable.comptes = this.localDB.compteTable.comptes.filter(compte => compte.idCompte !== idCompte)
    this.comptes$.next(this.localDB.compteTable.comptes)
    this.save()
  }

  deleteMessage(idMessage: number){
    this.localDB.messageTable.messages = this.localDB.messageTable.messages.filter(message => message.id !== idMessage)
    this.messages$.next(this.localDB.messageTable.messages)
    this.save()
  }

  saveMessage(message: Message){
    const messages = this.localDB.messageTable.messages
    if(message.id === 0){
      this.localDB.messageTable.idCounter++
      message.id = this.localDB.messageTable.idCounter
      this.localDB.messageTable.messages.push(message)
    }else{
      const i = messages.findIndex(m => m.id === message.id)

      if(i>=0)
        this.localDB.messageTable.messages[i] = message
    }

    this.messages$.next(this.localDB.messageTable.messages)

    this.save()
  }

  getCompteById(idCompte:string){
    return this.localDB.compteTable.comptes.find( (compte:Compte) => compte.idCompte === idCompte )
  }

  getComptes(){
     this.comptes$.next(this.localDB.compteTable.comptes)
  }

  getComptesByPredicat(predicat: any){
    return new Observable<Compte[]>(observer =>{
     observer.next(this.localDB.compteTable.comptes.filter(predicat))
     observer.complete()
    }) 
  }

  getCompteByPredicat(predicat:any){
    return this.localDB.compteTable.comptes.find(predicat)
  }

  getMessages(){
    return this.localDB.messageTable.messages
  }

  getMessagesByPredicat(predicat: any){
    return new Observable<Message[]>(observer=>{
      observer.next(this.localDB.messageTable.messages.filter(predicat))
      observer.complete()
    })
    
  }

  getMessageById(idMessage:number){
    return this.localDB.messageTable.messages.find( message => message.id === idMessage )
  }

  getMessageByPredicat(predicat: any){
    return this.localDB.messageTable.messages.find(predicat)
  }

  save(){
    localStorage.setItem("localDB",JSON.stringify(this.localDB))
  }
}
