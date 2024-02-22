import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ServiceAjout } from '../Types/Service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-dialog-ajout-service',
  templateUrl: './dialog-ajout-service.component.html',
  styleUrl: './dialog-ajout-service.component.css'
})
export class DialogAjoutServiceComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAjoutServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, 
    private authService: AuthentificationService, 
  ){}

  errorMessage = ''
  nom = ''
  prix = ''
  delai = ''
  commission = ''

  @Output() ajoutElement: EventEmitter<any> = new EventEmitter();

  closeDialog(): void{
    this.dialogRef.close();
  }

  sendData(credentials: ServiceAjout) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('http://localhost:3000/service/add',credentials,{headers: headers});
  }

  addService(){
    this.errorMessage='';
    if(this.nom === ''){
      this.errorMessage='Veuillez entrer le nom';
      return;
    }
    if(this.prix === ''){
      this.errorMessage='Veuillez entrer le prix';
      return;
    }
    if(this.delai === ''){
      this.errorMessage='Veuillez entrer le délai';
      return;
    }
    if(this.commission === ''){
      this.errorMessage='Veuillez entrer le montant de la commission';
      return;
    }
    const service : ServiceAjout = {
      nom : this.nom,
      prix : parseInt(this.prix),
      delai: parseInt(this.delai),
      commission: parseInt(this.commission)
    }

    this.sendData(service).subscribe(succes => {
      this.errorMessage = '';
      this.ajoutElement.emit();
      this.dialogRef.close();
    }, error => {
        this.errorMessage=error.error.message;
    })
  }
}
