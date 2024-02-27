import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Services } from '../Types/Service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogAjoutOffreComponent } from '../dialog-ajout-offre/dialog-ajout-offre.component';
import { Offres } from '../Types/Offre';

@Component({
  selector: 'app-gestion-offre',
  templateUrl: './gestion-offre.component.html',
  styleUrl: './gestion-offre.component.css'
})
export class GestionOffreComponent {
  constructor(
    private http: HttpClient, 
    private authService: AuthentificationService, 
    private _snackBar: MatSnackBar,
    public dialog:MatDialog
  ){}

  offres: Offres = [];

  fetchOffres() : Observable<Offres> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Offres>('https://m1p10mean-fanjava-diamondra-back.vercel.app/offre/list',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchOffres().subscribe((data: Offres) => {
      this.offres = data;
    })
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogAjoutOffreComponent,{
      width: '50%',
      panelClass: 'dialog-container'
    });

    dialogRef.componentInstance.ajoutElement.subscribe(() => {
      this.fetchOffres().subscribe((data: Offres) => {
        this.offres = data;
      })
    });
  }
}
