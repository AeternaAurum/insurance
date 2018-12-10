import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Placeholder } from './../shared/placeholder';


@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {
  placeholderUrl = 'https://jsonplaceholder.typicode.com/posts';

  getJson() {
    return this.http.get<[Placeholder]>(this.placeholderUrl);
  }

  constructor(private http: HttpClient) {}
}
