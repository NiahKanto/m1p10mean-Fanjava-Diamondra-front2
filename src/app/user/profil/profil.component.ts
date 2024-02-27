import { Component } from '@angular/core';
import { AuthentificationService } from '../../authentification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../Types/User';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  utilisateur:  any;
  editMode: boolean = false;
  editedUser: User | undefined;
  passwordEditMode = false;
  errorMessage = '';
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top'

  constructor(private http: HttpClient, private authService: AuthentificationService,private _snackBar: MatSnackBar) { }

  isClient(){
    return this.authService.isClient()
  }

  openSnackBar(message: string, action:string){
    this._snackBar.open(message, action,{
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  getFiche(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<User>('http://localhost:3000/ma_fiche', { headers: headers });
  }

  modif_user(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put('http://localhost:3000/modif_userfiche', { headers: headers });
  }

  togglePasswordEditMode(): void {
    this.passwordEditMode = !this.passwordEditMode;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    // Réinitialisation des données du formulaire de modification lors de la sortie du mode d'édition
    if (!this.editMode) {
      this.editedUser = { ...this.utilisateur };
    }
  }

  saveChanges(profileForm: NgForm): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    const body = {
      "nom": profileForm.value.nom,
      "email": profileForm.value.email
    }; 
    this.http.put('http://localhost:3000/modif_userfiche/', body, { headers: headers }).subscribe(response => {
      console.log(response);
      this.openSnackBar('Modification effectuée','Fermer');
      this.editMode = false;
    }, error => { 
      this.errorMessage= error.error.message;
      console.error(error);
    });
  } 

  changePassword(passwordForm: NgForm): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    const body = {
      "mdpAncien": passwordForm.value.currentPassword,
      "mdpVaovao": passwordForm.value.newPassword
    }; 
    this.http.put('http://localhost:3000/modif_userMDP/', body, { headers: headers }).subscribe(response => {
      console.log(response);
      this.openSnackBar('Modification effectuée','Fermer');
      this.editMode = false;
    }, error => { 
      this.errorMessage= error.error.message;
      console.error(error);
    });
  } 

  ngOnInit(): void {
    this.getFiche().subscribe(data => {
    this.utilisateur = data;
    this.editedUser = { ...this.utilisateur };  
    });
  }

}
