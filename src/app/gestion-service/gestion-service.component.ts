import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Services } from '../Types/Service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogAjoutServiceComponent } from '../dialog-ajout-service/dialog-ajout-service.component';

@Component({
  selector: 'app-gestion-service',
  templateUrl: './gestion-service.component.html',
  styleUrl: './gestion-service.component.css'
})
export class GestionServiceComponent {
  constructor(
    private http: HttpClient, 
    private authService: AuthentificationService, 
    private _snackBar: MatSnackBar,
    public dialog:MatDialog
  ){}

  services : Services =[];

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

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogAjoutServiceComponent,{
      width: '50%',
    });

    dialogRef.componentInstance.ajoutElement.subscribe(() => {
      this.fetchServices().subscribe((data: Services) => {
        this.services = data;
      })
    });
  }
}
