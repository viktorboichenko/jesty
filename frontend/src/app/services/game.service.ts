import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';

  checkRoom(pin: string): Observable<any> {
    const url = `${this.apiUrl}/games/${pin}`;
    return this.http.get(url);
  }
}
