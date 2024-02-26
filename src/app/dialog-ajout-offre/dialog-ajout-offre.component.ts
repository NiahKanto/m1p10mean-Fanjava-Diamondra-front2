import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { OffreAjout } from '../Types/Offre';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Services } from '../Types/Service';

@Component({
  selector: 'app-dialog-ajout-offre',
  templateUrl: './dialog-ajout-offre.component.html',
  styleUrl: './dialog-ajout-offre.component.css'
})
export class DialogAjoutOffreComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAjoutOffreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, 
    private authService: AuthentificationService, 
  ){}

  errorMessage = ''
  nom = ''
  description = ''
  dateDebut = ''
  dateFin = ''
  reduction = ''
  services: Services = []
  service: string[] = []

  @Output() ajoutElement: EventEmitter<any> = new EventEmitter();

  closeDialog(): void{
    this.dialogRef.close();
  }

  sendData(credentials: OffreAjout) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('http://localhost:3000/offre/add',credentials,{headers: headers});
  }

  fetchServices() : Observable<Services> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Services>('http://localhost:3000/service/all',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchServices().subscribe((data: Services) => {
      this.services = data;
    })
  }

  addOffre(){
    this.errorMessage='';
    if(this.nom === ''){
      this.errorMessage='Veuillez entrer le nom';
      return;
    }
    if(this.description === ''){
      this.errorMessage='Veuillez entrer la description';
      return;
    }
    if(this.dateDebut === ''){
      this.errorMessage='Veuillez entrer la date debut';
      return;
    }
    if(this.dateFin === ''){
      this.errorMessage='Veuillez entrer la date fin';
      return;
    }
    if(this.reduction === ''){
      this.errorMessage='Veuillez entrer la valeur de la reduction';
      return;
    }
    if(this.service.length === 0){
      this.errorMessage='Veuillez choisir un service au-moins';
      return;
    }
    const offre : OffreAjout = {
      nom : this.nom,
      description: this.description,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      reduction: this.reduction,
      service: this.service
    }

    this.sendData(offre).subscribe(succes => {
      this.errorMessage = '';
      this.ajoutElement.emit();
      this.dialogRef.close();
    }, error => {
        this.errorMessage=error.error.message;
    })
  }
}
