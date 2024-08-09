import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepserviceService {

  private baseUrl: string = 'https://viacep.com.br/ws/';

  constructor(private httpClient: HttpClient) { }

  buscar(cep: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${cep}/json`);
  }
}

