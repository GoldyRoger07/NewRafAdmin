import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url-service';
import { Compte } from '../models/Compte';
import { LocalDBService } from './local-dbservice';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

    comptes$!:Observable<Compte[]>
    
    
    constructor(private http: HttpClient,private urlService: UrlService,private localDBService: LocalDBService){
      this.comptes$ = localDBService.comptes$
      // this.createCompte()
    }

    login(email: string, password: string,rememberMe: boolean){
      return this.http.post(this.urlService.baseUrl+"compte/login?remember_me="+rememberMe,{email:email,password:password})
    }

    createCompte(){
     
    }

    getCompteByEmail(email:string){
      const predicat = (compte:Compte) => {
        return compte.email === email
      }

     return this.localDBService.getCompteByPredicat(predicat)
    }

    getCompteById(id:string){
      return this.localDBService.getCompteById(id)
    }
    
    getComptesWithout(id:string){
      const predicat = (compte:Compte) => compte.idCompte !== id
      
      return this.localDBService.getComptesByPredicat(predicat)
    }
}
