import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../services/url-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private urlService:UrlService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifiez si la requête cible une URL spécifique
    const exceptionUrls = this.urlService.exceptionUrls
    const hasExceptionUrl = exceptionUrls.some(url =>{ 
      // console.log(`exceptionUrl :  ${url} request.url: ${request.url}`) 
       return request.url.includes(url)}) 
    console.log(`hasExceptionUrl: ${hasExceptionUrl}`)
       if (!hasExceptionUrl) {
      
      const token = localStorage.getItem("token") // Récupérer le token
      if (token) {
        console.log("interceptor")
        console.log(request.url)
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "1"
          }
        });
      }
    }

    return next.handle(request);
  }
}
