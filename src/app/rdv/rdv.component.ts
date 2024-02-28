import { CdkDragDrop, moveItemInArray, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Services } from '../Types/Service';
import { Observable } from 'rxjs'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RDV, ServicesRDV, ServiceRDV } from '../Types/RDV'
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrl: './rdv.component.css'
})
export class RdvComponent implements OnInit{
  constructor(
    private http: HttpClient, 
    private authService: AuthentificationService, 
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar
  ){}
  selectedDate: Date|null = null;
  selectedTime: string = '';

  services : Services =[];
  targetServices : Services=[];
  rowHeight = 0;
  errorMessage = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top'

  drop(event: CdkDragDrop<Services>){
    if(event.previousContainer !== event.container){
        transferArrayItem(event.previousContainer.data, event.container.data,event.previousIndex,event.currentIndex);     
    }
  }

  fetchServices() : Observable<Services> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Services>('https://m1p10mean-fanjava-diamondra-back.vercel.app/service/all',{headers: headers});
  }

  sendData(credentials: RDV) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/add',credentials,{headers: headers});
  }

  ngOnInit(): void {
    this.fetchServices().subscribe((data: Services) => {
      this.services = data;
      this.rowHeight = 40 * this.services.length;
    })
  }

  onDateChange(event: MatDatepickerInputEvent<Date> ){
    this.selectedDate = event.value;
  }

  openSnackBar(message: string, action:string){
    this._snackBar.open(message, action,{
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  addRDV(){
    this.errorMessage ='';
    if(this.targetServices.length === 0){
      this.errorMessage='Veuillez choisir un service au moins';
      return;
    }
    if(this.selectedDate === null || this.selectedTime === ''){
      this.errorMessage="Veuillez définir la date et l'heure";
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
    const dateHeure = this.datePipe.transform(this.selectedDate,'yyyy-MM-dd HH:mm:ss')
    const rdv: RDV ={
      dateHeure: dateHeure,
      service: paramService
    };
    this.sendData(rdv).subscribe(succes => {
      this.errorMessage = '';
      this.selectedDate = null;
      this.selectedTime = '';
      this.targetServices = [];
      this.openSnackBar('Rendez-vous ajouté avec succès','Fermer');
    }, error => {
        this.errorMessage=error.error.message;
    })
  }
}
