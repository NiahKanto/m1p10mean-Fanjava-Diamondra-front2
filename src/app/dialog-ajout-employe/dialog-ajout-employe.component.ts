import { Component, Inject, Output, EventEmitter } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { UserInscription } from '../Types/User';

@Component({
  selector: 'app-dialog-ajout-employe',
  templateUrl: './dialog-ajout-employe.component.html',
  styleUrl: './dialog-ajout-employe.component.css'
})
export class DialogAjoutEmployeComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAjoutEmployeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, 
    private authService: AuthentificationService, 
  ){}

  @Output() ajoutElement: EventEmitter<any> = new EventEmitter();

  nom = ''
  email = ''
  mdp = ''
  confirmmdp = ''
  errorMessage = '';

  closeDialog(): void{
    this.dialogRef.close();
  }

  sendData(credentials: UserInscription) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('http://localhost:3000/inscription_emp',credentials,{headers: headers});
  }

  addService(){
    this.errorMessage='';
    if(this.nom === ''){
      this.errorMessage='Veuillez entrer le nom';
      return;
    }
    if(this.email === ''){
      this.errorMessage='Veuillez entrer l\'email';
      return;
    }
    if(this.mdp === ''){
      this.errorMessage='Veuillez entrer le mot de passe';
      return;
    }
    if(this.confirmmdp === ''){
      this.errorMessage='Veuillez entrer le mot de passe de confirmation';
      return;
    }
    const service : UserInscription = {
      nom : this.nom,
      email: this.email,
      mdp: this.mdp,
      confirmmdp: this.confirmmdp
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
