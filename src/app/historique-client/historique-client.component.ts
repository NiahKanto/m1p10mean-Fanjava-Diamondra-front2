import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
import { RDVData, RDVDataUnits, RDVDataTotals } from '../Types/RDV';
import { MatDialog } from '@angular/material/dialog';
import { DialogPayRdvComponent } from '../dialog-pay-rdv/dialog-pay-rdv.component';

@Component({
  selector: 'app-historique-client',
  templateUrl: './historique-client.component.html',
  styleUrl: './historique-client.component.css'
})
export class HistoriqueClientComponent implements OnInit{
  constructor(
    private http: HttpClient, 
    private authService: AuthentificationService,
    public dialog:MatDialog
  ){}

  rdvs : RDVDataUnits =[];
  totalRdvs: RDVDataTotals=[];
  fusion: any;

  fetchRDV() : Observable<RDVData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<RDVData>('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/list-by-client',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchRDV().subscribe((data: RDVData) => {
      this.rdvs = data.rdvs;
      this.totalRdvs=data.totalRdvs;
      console.log(this.rdvs);
      console.log(this.totalRdvs)
      this.fusion = this.rdvs.map((obj,index) => ({
        ...obj,
        ...this.totalRdvs[index]
      }))
    })
  }

  openDialog(id: string): void{
    const dialogRef = this.dialog.open(DialogPayRdvComponent,{
      width: '50%',
      data: id
    });

    dialogRef.componentInstance.pay.subscribe(() => {
      this.fetchRDV().subscribe((data: RDVData) => {
        this.rdvs = data.rdvs;
        this.totalRdvs=data.totalRdvs;
        console.log(this.rdvs);
        console.log(this.totalRdvs)
        this.fusion = this.rdvs.map((obj,index) => ({
          ...obj,
          ...this.totalRdvs[index]
        }))
      })
    });
  }
}
