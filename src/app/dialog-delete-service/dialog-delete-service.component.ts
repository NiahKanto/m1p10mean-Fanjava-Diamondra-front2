import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-dialog-delete-service',
  templateUrl: './dialog-delete-service.component.html',
  styleUrl: './dialog-delete-service.component.css'
})
export class DialogDeleteServiceComponent {

  @Output() deleteElement: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private http: HttpClient, 
    private authService: AuthentificationService, 
  ){}

  closeDialog(): void{
    this.dialogRef.close();
  }

  sendData(id: string) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post('https://m1p10mean-fanjava-diamondra-back.vercel.app/service/delete',{id: id},{headers: headers});
  }

  deleteService(){
      this.sendData(this.data).subscribe(succes => {
      this.deleteElement.emit();
      this.dialogRef.close();
    }, error => {
        
    })
  }
}
