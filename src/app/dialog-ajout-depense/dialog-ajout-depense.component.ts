import { Component, Inject, Output, EventEmitter } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { UserInscription } from '../Types/User';

@Component({
  selector: 'app-dialog-ajout-depense',
  templateUrl: './dialog-ajout-depense.component.html',
  styleUrl: './dialog-ajout-depense.component.css'
})
export class DialogAjoutDepenseComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAjoutDepenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, 
    private authService: AuthentificationService, 
  ){}

  @Output() ajoutElement: EventEmitter<any> = new EventEmitter();

  errorMessage=''
  nom = ''
  prix = ''
  date = ''

  closeDialog(): void{
    this.dialogRef.close();
  }

  sendData(credentials: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('https://m1p10mean-fanjava-diamondra-back.vercel.app/depense/add',credentials,{headers: headers});
  }

  addService(){
    this.errorMessage='';
    if(this.nom === ''){
      this.errorMessage='Veuillez entrer le nom';
      return;
    }
    if(this.prix === ''){
      this.errorMessage='Veuillez entrer le montant';
      return;
    }
    if(this.date === ''){
      this.errorMessage='Veuillez entrer la date';
      return;
    }
    const depense : any = {
      nom : this.nom,
      prix: this.prix,
      date: this.date
    }

    this.sendData(depense).subscribe(succes => {
      this.errorMessage = '';
      this.ajoutElement.emit();
      this.dialogRef.close();
    }, error => {
        this.errorMessage=error.error.message;
    })
  }
}
