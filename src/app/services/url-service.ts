import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UrlService {
  frontendUrl = "https://raf-prod.onrender.com"
  // frontendUrl = "http://localhost:8100"
  // serverUrl = "http://192.168.0.196:8080"
  // serverUrl = "http://192.168.127.195:8080"
  serverUrl = "http://localhost:8080"
  // serverUrl = "https://sure-wired-redfish.ngrok-free.app"
  // serverUrl = "https://raf-quiz-production.up.railway.app"
  baseUrl = this.serverUrl+"/api/raf"
  // baseUrl = "http://192.168.0.178:8080/api/raf"

  compteUrl = this.baseUrl+"/compte"

  exceptionUrls = [
    this.compteUrl+"/login",
    this.compteUrl+"/login/google",
    this.compteUrl+"/inscription-partie1",
    this.compteUrl+"/inscription-partie2",
    this.baseUrl+"/email/code-verification",
    this.baseUrl+"/email/resend/code-verification",
    this.baseUrl+"/compte/forget-password",
    this.baseUrl+"/compte/forget-password2",
    this.baseUrl+"/websocket",
    // this.baseUrl+"/real-time-notifications"
  ]

  constructor() { }

  redirectTo(url:string){
    window.location.href = url
  }

  reload(){
    window.location.reload()
  }
}
