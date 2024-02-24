import { Component, OnInit } from '@angular/core';
import { serviceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../../authentification.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-service-fiche-component',
  templateUrl: './service.fiche.component.html',
  styleUrls: ['./service.fiche.component.css']
})
export class ServiceFicheComponent implements OnInit {
  services: any;
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private servv: serviceService,
    private http: HttpClient, 
    private authService: AuthentificationService, 
  ) { }

  modifyNom : boolean = false;
  newNom: string = '';
  errorNom: string = '';

  modifyPrix : boolean = false;
  newPrix: string = '';
  errorPrix: string = '';

  modifyDelai : boolean = false;
  newDelai: string = '';
  errorDelai: string = '';

  modifyCommission : boolean = false;
  newCommission: string = '';
  errorCommission: string = '';

  
  fetchFiche(){
     // Récupérer l'ID depuis les paramètres de la route
    this.route.params.subscribe(params => {
      this.id = params['id']; // Obtenez l'ID depuis les paramètres de la route
      console.log("id="+this.id)
      this.servv.getfiche(this.id).subscribe(data => {
        this.services = data;
      });
    });
  }

  ngOnInit(): void {
    this.fetchFiche();
  }

  setModifyNom(value: boolean){
    this.errorNom = '';
    if(value){
      this.newNom = this.services.nom;
    }
    else{
      this.newNom = ''
    }
    this.modifyNom = value;
  }

  sendNom(nom: string, id:string) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('http://localhost:3000/service/modifyNom',{nom: nom, id: id},{headers: headers});
  }

  handleModifyNom(){
    this.errorNom='';
    if(this.newNom === ''){
      this.errorNom='Veuillez entrer le nom';
      return;
    }

    if(this.newNom === this.services.nom){
      this.errorNom='Veuillez entrer un nouveau nom différent';
      return;
    }

    this.sendNom(this.newNom, this.id).subscribe(succes => {
      this.errorNom = '';
      this.fetchFiche();
      this.setModifyNom(false);
    }, error => {
        this.errorNom=error.error.message;
    })

  }

  setModifyPrix(value: boolean){
    this.errorPrix = '';
    if(value){
      this.newPrix = this.services.prix;
    }
    else{
      this.newPrix = '';
    }
    this.modifyPrix = value;
  }

  sendPrix(prix: string, id:string) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('http://localhost:3000/service/modifyPrix',{prix: prix, id: id},{headers: headers});
  }

  handleModifyPrix(){
    this.errorPrix='';
    if(this.newPrix === ''){
      this.errorPrix='Veuillez entrer le prix';
      return;
    }

    if(this.newPrix === this.services.prix){
      this.errorPrix='Veuillez entrer un nouveau prix différent';
      return;
    }

    this.sendPrix(this.newPrix, this.id).subscribe(succes => {
      this.errorPrix = '';
      this.fetchFiche();
      this.setModifyPrix(false);
    }, error => {
        this.errorPrix=error.error.message;
    })

  }

  setModifyDelai(value: boolean){
    this.errorDelai = '';
    if(value){
      this.newDelai = this.services.delai;
    }
    else{
      this.newDelai = '';
    }
    this.modifyDelai = value;
  }

  sendDelai(delai: string, id:string) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('http://localhost:3000/service/modifyDelai',{delai: delai, id: id},{headers: headers});
  }

  handleModifyDelai(){
    this.errorDelai='';
    if(this.newDelai === ''){
      this.errorDelai='Veuillez entrer le prix';
      return;
    }

    if(this.newDelai === this.services.delai){
      this.errorDelai='Veuillez entrer un nouveau delai différent';
      return;
    }

    this.sendDelai(this.newDelai, this.id).subscribe(succes => {
      this.errorDelai = '';
      this.fetchFiche();
      this.setModifyDelai(false);
    }, error => {
        this.errorDelai=error.error.message;
    })

  }

  setModifyCommission(value: boolean){
    this.errorCommission = '';
    if(value){
      this.newCommission = this.services.commission;
    }
    else{
      this.newCommission = '';
    }
    this.modifyCommission = value;
  }

  sendCommission(commission: string, id:string) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('http://localhost:3000/service/modifyCommission',{commission: commission, id: id},{headers: headers});
  }

  handleModifyCommission(){
    this.errorCommission='';
    if(this.newCommission === ''){
      this.errorCommission='Veuillez entrer la commission';
      return;
    }

    if(this.newCommission === this.services.commission){
      this.errorCommission='Veuillez entrer une nouvelle commission différente';
      return;
    }

    this.sendCommission(this.newCommission, this.id).subscribe(succes => {
      this.errorCommission = '';
      this.fetchFiche();
      this.setModifyCommission(false);
    }, error => {
        this.errorCommission=error.error.message;
    })

  }
}