import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url-service';
import { Compte } from '../models/Compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

    
    constructor(private http: HttpClient,private urlService: UrlService){}

    login(email: string, password: string,rememberMe: boolean){
      return this.http.post(this.urlService.baseUrl+"compte/login?remember_me="+rememberMe,{email:email,password:password})
    }

    getComptesData(): Compte[]{
      return [
        {
          idCompte: 'fg345678',
          nom: 'Gouraige',
          prenom: 'Francesse',
          username: 'Raiki',
          createdAt: new Date(),
          telephone: '37297929',
          role: 'ADMIN',
          actif: true,
          idConnection: '2223455',
          solde: 50000,
          soldePromo: 850,
          points: 15,
          email: 'sasugou1@gmail.com',
          codePromo: 'RAIKI_PROMO',
          idAgent: 'lg12345678',
          password: 'no_password',
          urlPhotoProfile: 'just_a_image'
        },
        {
          idCompte: 'lg12345678',
          nom: 'Latouche',
          prenom: 'Gerson',
          username: 'Sonix',
          createdAt: new Date(),
          telephone: '34977530',
          role: 'ADMIN',
          actif: true,
          idConnection: 'NO_CONNECTION',
          solde: 45000,
          soldePromo: 800,
          points: 10,
          email: 'latouche822@gmail.com',
          codePromo: 'LATOUCHE_PROMO',
          idAgent: 'fg345678',
          password: 'no_password',
          urlPhotoProfile: 'just_a_image'
        },
        {
          idCompte: 'dracule15678',
          nom: 'Dracule',
          prenom: 'Mihawk',
          username: 'hawkeye',
          createdAt: new Date(),
          telephone: '34977530',
          role: 'USER',
          actif: true,
          idConnection: 'NO_CONNECTION',
          solde: 35000,
          soldePromo: 300,
          points: 44,
          email: 'latouche822@gmail.com',
          codePromo: 'LATOUCHE_PROMO',
          idAgent: 'NO_AGENT',
          password: 'no_password',
          urlPhotoProfile: 'just_a_image'
        }
      ]
    }

    getComptes() {
      return Promise.resolve(this.getComptesData())
    }
}
