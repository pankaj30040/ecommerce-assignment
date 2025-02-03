import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  getProducts(){
    return this.httpClient.get('https://api.escuelajs.co/api/v1/products').pipe(
      map((res) => { return res }));
  }

  getProductById(id:any){
    return this.httpClient.get('https://api.escuelajs.co/api/v1/products/'+id).pipe(
      map((res) => { return res }));
  }

  addProduct(payload:any){
    return this.httpClient.post('https://api.escuelajs.co/api/v1/products/', payload).pipe(
      map((res) => { return res }));
  }

  getAllCategories(){
    return this.httpClient.get('https://api.escuelajs.co/api/v1/categories').pipe(
      map((res) => { return res }));
  }

  uploadFile(file: File){
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Accept': 'application/json'  // Do NOT set 'Content-Type' manually for multipart/form-data
    });

    return this.httpClient.post('https://api.escuelajs.co/api/v1/files/upload', formData, { headers });
  }
}
