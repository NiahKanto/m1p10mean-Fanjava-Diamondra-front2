import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
import { Users } from '../Types/User';
import { MatDialog } from '@angular/material/dialog';
import { DialogAjoutEmployeComponent } from '../dialog-ajout-employe/dialog-ajout-employe.component';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
})
export class EmployeComponent {
  constructor(
    private http: HttpClient, 
    private authService: AuthentificationService,
    public dialog:MatDialog
  ){}

  users: Users = [];

  fetchClient() : Observable<Users> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Users>('https://m1p10mean-fanjava-diamondra-back.vercel.app/liste_user/employe',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchClient().subscribe((data: Users) => {
      this.users = data;
    })
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogAjoutEmployeComponent,{
      width: '50%',
    });

    dialogRef.componentInstance.ajoutElement.subscribe(() => {
      this.fetchClient().subscribe((data: Users) => {
        this.users = data;
      })
    });
  }

}
