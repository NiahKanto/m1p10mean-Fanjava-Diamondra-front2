// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private divVisibilitySubject = new BehaviorSubject<boolean>(true);
  divVisibility$: Observable<boolean> = this.divVisibilitySubject.asObservable();

  toggleDivVisibility() {
    this.divVisibilitySubject.next(!this.divVisibilitySubject.value);
  }
}
