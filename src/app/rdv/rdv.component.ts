import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Services } from '../Types/Service';
import { Observable } from 'rxjs'
import { Employes } from '../Types/Employe';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RDV, ServicesRDV, ServiceRDV } from '../Types/RDV'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrl: './rdv.component.css'
})
export class RdvComponent implements OnInit{
  constructor(private http: HttpClient, private authService: AuthentificationService, private datePipe: DatePipe){}
  selectedDate: Date|null = null;
  selectedTime: string = '';

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

  sendData(credentials: RDV) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('http://localhost:3000/rdv/add',credentials,{headers: headers});
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

  onDateChange(event: MatDatepickerInputEvent<Date> ){
    this.selectedDate = event.value;
  }

  addRDV(){
    if(this.targetServices.length === 0){
      alert("Service Vide");
      return;
    }
    if(this.selectedDate === null || this.selectedTime === ''){
      alert("Date et heure non definis");
      return;
    }
    const paramService: ServicesRDV = [];
    this.targetServices.forEach((service =>{
      const s : ServiceRDV = {idService: service._id, idEmploye: null };
      paramService.push(s);
    }))
    const times = this.selectedTime.split(':');
    this.selectedDate.setHours(parseInt(times[0]));
    this.selectedDate.setMinutes(parseInt(times[1]));
    const dateHeure = this.datePipe.transform(this.selectedDate,'yyyy-MM-dd hh:mm:ss')
    const rdv: RDV ={
      dateHeure: dateHeure,
      service: paramService
    };
    this.sendData(rdv).subscribe((response) => {
      console.log(response);
    })
  }
}
