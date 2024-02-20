import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Services } from '../Types/Service';
import { Observable } from 'rxjs'
import { Employes } from '../Types/Employe';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrl: './rdv.component.css'
})
export class RdvComponent implements OnInit{
  constructor(private http: HttpClient, private authService: AuthentificationService){}

  services : Services =[];
  targetServices : Services=[];
  rowHeight = 0;

  drop(event: CdkDragDrop<Services>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
    } else{
      if (event.previousContainer.data === this.targetServices && event.container.data === this.services){
        this.targetServices.splice(event.previousIndex,1);
      }
      else if(!this.targetServices.includes(event.previousContainer.data[event.previousIndex])){
        copyArrayItem(event.previousContainer.data, event.container.data,event.previousIndex,event.currentIndex);
      }
     
    }
  }

  fetchServices() : Observable<Services> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Services>('http://localhost:3000/service/all',{headers: headers});
  }

  fetchEmployes() : Observable<Services> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Services>('http://localhost:3000/liste_user/employe',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchServices().subscribe((data: Services) => {
      this.services = data;
      this.rowHeight = 50 * this.services.length;
    })

    this.fetchEmployes().subscribe((data: Employes)=>{
      console.log(data)
    })
  }
}
