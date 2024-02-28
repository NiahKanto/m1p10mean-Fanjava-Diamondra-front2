import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stat-rdv',
  templateUrl: './stat-rdv.component.html',
  styleUrl: './stat-rdv.component.css'
})
export class StatRDVComponent {
  single: any[] = [];

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  xAxisLabel = 'Mois';
  yAxisLabel = 'Nombre de rendez-vous'

  constructor(private authService: AuthentificationService, private http: HttpClient){
    const year = (new Date()).getFullYear();
  }
  fetchStat() : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<any>('http://localhost:3000/rdv/statRDVMonth',{headers: headers});
  }

  ngOnInit(){
    this.fetchStat().subscribe((data: any) => {
      const newSingle = [];
      for(let m=1; m<= 12; m++){
        const mData = data.find((data: { _id: { month: number; }; })=> data._id.month === m);
        if(mData){
            newSingle.push({name: m+'-'+(new Date()).getFullYear(), value: mData.total})
        }
        else{
            newSingle.push({name: m+'-'+(new Date()).getFullYear(), value: 0})
        }
      }
      this.single = newSingle;
    });
  }

}
