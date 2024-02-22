import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../../authentification.service';
import { Services } from '../../Types/Service';
import { Servicee } from '../../Types/Service';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, copyArrayItem ,transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-suivi-taches',
  templateUrl: './suivi-taches.component.html',
  styleUrls: ['./suivi-taches.component.css']
})
export class SuiviTachesComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthentificationService) {}

  afaire: Servicee[] = [];
  encours: Servicee[] = [];
  fini: Servicee[] = [];
  rowHeight = 0;

  drop(event: CdkDragDrop<Servicee[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Supprime l'élément du conteneur source si le glisser-déposer est de 'encours' à 'afaire'
      // if (event.previousContainer.id === 'encours' && event.container.id === 'afaire') {
      //   this.encours.splice(event.previousIndex, 1);
      // } else 
      if (event.previousContainer.id !== 'afaire' && event.container.id === 'afaire') {
        // Supprime l'élément du conteneur source si le glisser-déposer est de 'fini' à 'afaire'
        // this.fini.splice(event.previousIndex, 1);
      }
  
      // Transfère l'élément entre les conteneurs si les conditions sont remplies
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
  
  
  

  fetchServices(): Observable<Servicee[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Servicee[]>('http://localhost:3000/service/all', { headers: headers });
  }

  ngOnInit(): void {
    this.fetchServices().subscribe((data: Servicee[]) => {
      this.afaire = data;
      this.rowHeight = 50 * this.afaire.length;
    });
  }
}

