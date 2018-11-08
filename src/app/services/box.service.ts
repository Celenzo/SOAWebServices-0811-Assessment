import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  private clientId = 'y2g1ioffkw1ngj6w29r1yu6koikntnjf';
  private clientSecret = 'ekL7073wefgt0zD2AbtbE3N5bJNlqGQB';
  private accessToken = '2tf4HB4D4VT9MCQiVJ10ZGyKwriL7VLH';

  constructor(private httpClient: HttpClient) { }

  public getFiles(folderId: string) {
    const header = new HttpHeaders({ 
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.httpClient.get(`https://api.box.com/2.0/folders/${folderId}/items`, { headers: header });
  }

  public download(fileId: string) {
    const header = new HttpHeaders({ 
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.httpClient.get(`https://api.box.com/2.0/files/${fileId}?fields=expiring_embed_link`, { headers: header });
  }
}
