import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { PaiementAjout } from '../Types/Paiement';

@Component({
  selector: 'app-dialog-pay-rdv',
  templateUrl: './dialog-pay-rdv.component.html',
  styleUrl: './dialog-pay-rdv.component.css'
})
export class DialogPayRdvComponent {
  @Output() pay: EventEmitter<any> = new EventEmitter();

  errorMessage = ''
  montant = ''
  mdp = ''

  constructor(
    public dialogRef: MatDialogRef<DialogPayRdvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private http: HttpClient, 
    private authService: AuthentificationService, 
  ){}

  closeDialog(): void{
    this.dialogRef.close();
  }

  sendData(credentials: PaiementAjout) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/pay',credentials,{headers: headers});
  }

  addPaiement(){
    this.errorMessage='';
    if(this.montant === ''){
      this.errorMessage='Veuillez entrer le montant';
      return;
    }
    if(this.mdp === ''){
      this.errorMessage='Veuillez entrer le mot de passe';
      return;
    }
    
    const paiement : PaiementAjout = {
      id: this.data,
      montant: this.montant,
      mdp: this.mdp
    }

    this.sendData(paiement).subscribe(succes => {
      this.errorMessage = '';
      this.pay.emit();
      this.dialogRef.close();
    }, error => {
        this.errorMessage=error.error.message;
    })
  }

}
