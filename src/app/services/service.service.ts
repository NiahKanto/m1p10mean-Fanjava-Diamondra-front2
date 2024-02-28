import { Injectable } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class serviceService {
//   private apiUrl = 'http://your-node-api-url.com';

  constructor(private http: HttpClient, private authService: AuthentificationService) { }

  getfiche(id: string): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      console.log("tonga aty @miantso fonction")
      console.log("idddd"+id)
    return this.http.get(`https://m1p10mean-fanjava-diamondra-back.vercel.app/service/findById/${id}`,{headers: headers});
  }
}
