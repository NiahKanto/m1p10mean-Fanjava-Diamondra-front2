import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Services } from '../Types/Service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogAjoutDepenseComponent } from '../dialog-ajout-depense/dialog-ajout-depense.component';
import { Offres } from '../Types/Offre';

@Component({
  selector: 'app-gestion-depense',
  templateUrl: './gestion-depense.component.html',
  styleUrl: './gestion-depense.component.css'
})
export class GestionDepenseComponent {
  constructor(
    private http: HttpClient, 
    private authService: AuthentificationService, 
    private _snackBar: MatSnackBar,
    public dialog:MatDialog
  ){}

  depenses: any[] = [];

  fetchDepenses() : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Offres>('https://m1p10mean-fanjava-diamondra-back.vercel.app/depense/all',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchDepenses().subscribe((data: any) => {
      this.depenses = data;
    })
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogAjoutDepenseComponent,{
      width: '50%',
      panelClass: 'dialog-container'
    });

    dialogRef.componentInstance.ajoutElement.subscribe(() => {
      this.fetchDepenses().subscribe((data) => {
        this.depenses = data;
      })
    });
  }
}
