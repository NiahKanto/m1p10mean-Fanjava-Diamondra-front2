import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Services } from '../Types/Service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrl: './rdv.component.css'
})
export class RdvComponent implements OnInit{
  constructor(private http: HttpClient, private authService: AuthentificationService){}

  sourceList : string[] = [];
  targetList : string[] = [];
  services : Services =[];
  rowHeight = 0;

  drop(event: CdkDragDrop<any[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
    } else{
      transferArrayItem(event.previousContainer.data, event.container.data,event.previousIndex,event.currentIndex);
    }
  }

  fetchServices() : Observable<Services> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Services>('http://localhost:3000/service/all',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchServices().subscribe((data: Services) => {
      this.services = data;
      this.services.forEach(service =>{
        this.sourceList.push(service.nom);
        this.rowHeight = this.rowHeight + 50;
      })
    })
  }
}
