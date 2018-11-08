import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenService {

  constructor(private httpClient: HttpClient) { }

  public shortenUrl(url: string) {
    return this.httpClient.get(`/shrtn/api?url=${url}&method=xml`, { responseType: 'text' });
  }
}
