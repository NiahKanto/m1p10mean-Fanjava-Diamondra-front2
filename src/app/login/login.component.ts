import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = ''
  password = ''
  constructor(private http: HttpClient){}

  login(){
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.http.post<any>('http://localhost:3000/login',credentials).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.error(error)
      }
    )
  }
}
