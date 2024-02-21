import { Injectable } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RDVService {
//   private apiUrl = 'http://your-node-api-url.com';

  constructor(private http: HttpClient, private authService: AuthentificationService) { }

  getRendezVous(): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
    return this.http.get('http://localhost:3000/rdv/rdvToday/',{headers: headers});
  }
  getHistorique(): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
    return this.http.get('http://localhost:3000/rdv/list-rdv-by-employee/',{headers: headers});
  }
}
