import { Component } from '@angular/core';
import { RDVService } from '../../services/rdv.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, 
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-liste-serv-non-assigne',
  templateUrl: './liste-serv-non-assigne.component.html',
  styleUrl: './liste-serv-non-assigne.component.css'
})
export class ListeServNonAssigneComponent { 
  services: any;
  errorMessage= '';

  constructor(private rdvService: RDVService,private _snackBar: MatSnackBar) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top'


  ngOnInit(): void {
    this.rdvService.getListeServNonAssigneComponent().subscribe(data => {
    this.services = data;
    });
  }

  openSnackBar(message: string, action:string){
    this._snackBar.open(message, action,{
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  actualiserDonnees(): void {
    this.rdvService.getListeServNonAssigneComponent().subscribe(data => {
      this.services = data;
    });
  }

  async prendreEnCharge(idService: string): Promise<void> {
    try {
      console.log('hiantso fonction')
      await this.rdvService.assignerServ(idService).toPromise();
      console.log('VITA fonction')
      this.errorMessage = '';
      this.openSnackBar('Tâches bien assignée', 'Fermer');
      this.actualiserDonnees();
    } catch(error: any ) {
      if (error instanceof HttpErrorResponse) {  
        this.errorMessage = error.error.message;
      } else { 
        this.errorMessage = error.message;
      }
    }
  };
  
  
}
