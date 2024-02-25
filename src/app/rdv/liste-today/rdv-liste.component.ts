import { Component, OnInit } from '@angular/core';
import { RDVService } from '../../services/rdv.service';
import { AuthentificationService } from '../../authentification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-rdv-liste-component',
  templateUrl: './rdv-liste.component.html',
  styleUrls: ['./rdv-liste.component.css']
})
export class RDVlisteComponent implements OnInit {
  rendezVous: any;
  selectedRdvId: any;
  rdvDetails:  any;

  constructor(private rdvService: RDVService, private http: HttpClient, private authService: AuthentificationService) { }

  getfindServ4RDV(idRdv: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`http://localhost:3000/rdv/findServ4RDV/${idRdv}`, { headers: headers });
  }
 
  voirDetails(idRdv: string): void {
    console.log('appel fonction')
    this.selectedRdvId = idRdv;
    console.log('idRdv='+idRdv)
    this.getfindServ4RDV(idRdv).subscribe((details: any) => {
      this.rdvDetails = details;
      console.log('rdvdetail==='+details)
    });
  }
  

  ngOnInit(): void {
    this.rdvService.getRendezVous().subscribe(data => {
    this.rendezVous = data;
    });
  }
}