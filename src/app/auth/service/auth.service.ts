import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

    login(payload:any){
      return this.httpClient.post('https://api.escuelajs.co/api/v1/auth/login', payload).pipe(
        map((res) => { return res }));
    }
}
