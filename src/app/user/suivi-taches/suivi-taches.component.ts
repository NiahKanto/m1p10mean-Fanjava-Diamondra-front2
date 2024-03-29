import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../../authentification.service';
import { Services } from '../../Types/Service';
import { Servicee } from '../../Types/Service';
import { serv4rdv } from '../../Types/Service';
import { RDVID } from '../../Types/RDV';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, copyArrayItem ,transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-suivi-taches',
  templateUrl: './suivi-taches.component.html',
  styleUrls: ['./suivi-taches.component.css']
})
export class SuiviTachesComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthentificationService,private _snackBar: MatSnackBar) {}

  afaire: serv4rdv[] = [];
  encours: serv4rdv[] = [];
  fini: serv4rdv[] = [];
  total: any;
  rowHeight = 400;
  errorMessage = '';
  

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top'

  drop(event: CdkDragDrop<serv4rdv[]>){
    if (event.previousContainer.id === 'afaire' && event.container.id === 'fini') {
          return;
        }
        if (event.previousContainer.id === 'encours' && event.container.id === 'afaire') {
            return;
          }
        if (event.previousContainer.id === 'fini' && event.container.id === 'encours') {
            return;
          }
    if(event.previousContainer !== event.container){
        transferArrayItem(event.previousContainer.data, event.container.data,event.previousIndex,event.currentIndex);     
    }
  }
   
  fetchafaire(): Observable<serv4rdv[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<serv4rdv[]>('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/listAfaire', { headers: headers });
  }
  fetchencours(): Observable<serv4rdv[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<serv4rdv[]>('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/listEnCours', { headers: headers });
  }
  fetchfini(): Observable<serv4rdv[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<serv4rdv[]>('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/listFini', { headers: headers });
  }
  
  acceptServ(idRdv: string, idServ: string): Observable<any> {
     
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
     
    // Ici, les en-têtes sont passés comme troisième argument
    return this.http.post(`https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/acceptServ/${idRdv}/${idServ}`, {}, { headers: headers });
  }
  
  
  terminerServ(idRdv: string,idServ: string) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(`https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/finishServ/${idRdv}/${idServ}`,{},{headers: headers});
  }
  findRDV4Serv(idService: string):  Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/findRDV4Serv/${idService}`, { headers: headers });
  }
 
  private async processFini(fini: serv4rdv[]): Promise<void> {
    for (const item of fini) {
      const rdvId = await this.findRDV4Serv(item._id).toPromise();
      await this.terminerServ(rdvId._id, item._id).subscribe(response => {
      }, error => {
        console.error(error);
      });;
    }
  }
  private async processEncours(encours: serv4rdv[]): Promise<void> {
    for (const item of encours) {
      const rdvId = await this.findRDV4Serv(item._id).toPromise();
      this.acceptServ(rdvId._id, item._id).subscribe(response => {
      }, error => {
        console.error(error);
      });;
    }
  }

  openSnackBar(message: string, action:string){
    this._snackBar.open(message, action,{
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  async saveChangement(encours: serv4rdv[], fini: serv4rdv[]): Promise<void> {
  
    await this.processEncours(encours)
      .then(() => {
        this.errorMessage = '';
        this.openSnackBar('Tâches en cours ajoutées avec succès', 'Fermer');
      })
      .catch(error => {
        this.errorMessage = error.error.message; 
      });
  
    await this.processFini(fini)
      .then(() => {
        this.errorMessage = '';
        this.openSnackBar('Tâches finies modifiées avec succès', 'Fermer');
      })
      .catch(error => {
        this.errorMessage = error.error.message;
      });
  }
  
  

  ngOnInit(): void {
    this.fetchafaire().subscribe((data: serv4rdv[]) => 
    {
      this.afaire = data;
      this.rowHeight = 50 * this.afaire.length;
    });
    this.fetchencours().subscribe((data: serv4rdv[]) => 
    {
      this.encours = data;
      this.rowHeight = 50 * this.afaire.length;
    });
    this.fetchfini().subscribe((data: serv4rdv[]) => {
      this.fini = data;
      let total: number = 0; // Initialiser la variable total à 0
    
      for (let i = 0; i < data.length; i++) {
        total += data[i].prix * data[i].commission / 100; // Ajouter la commission de chaque élément à total
        console.log('total=' + total); // Afficher le total à chaque itération
      }
    
      this.total = total; // Assigner la valeur finale de total à this.total
    
      this.rowHeight = 50 * this.afaire.length; // Ajuster la hauteur de la grille
    });
    
  


  }
}

