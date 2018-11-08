import { Component } from '@angular/core';
import { DropboxService } from './services/dropbox.service';
import { BoxService } from './services/box.service';

import { tap, catchError } from 'rxjs/operators';
import { UrlShortenService } from './services/url-shorten.service';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { FirebaseService } from './services/firebase.service';

//TODO STYLE
//TODO BOX CONNECTION

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private dropboxFiles: Array<any> = [];
  private boxFiles: Array<any> = [];
  private shareShortUrl = "";
  private shareLongUrl = "";

  constructor(
    private boxService: BoxService,
    private dropboxService: DropboxService,
    private firebaseService: FirebaseService,
    private urlShortenService: UrlShortenService
  ) {

    this.boxService.getFiles('0')
    .pipe(
      tap((res: any) => {
        this.boxFiles = [...res.entries];
      }),
      catchError(err => {
        throw err;
      })
    ).subscribe();

    this.dropboxService.getFiles()
    .then((res) => {
      this.dropboxFiles = [...res.entries];
    });
  }

  dropboxShare(dropboxFile) {
    this.dropboxService.shareLink(dropboxFile)
    .then(res => {
      this.urlShortenService.shortenUrl(res.url)
      .pipe(
        tap(res => {
          this.addUrl(res);
        }),
        catchError(err => {
          throw err;
        })
      )
      .subscribe()
    });
  }

  boxShare(boxFile) {
    this.boxService.download(boxFile.id)
    .pipe(
      tap((res: any) => {
        this.urlShortenService.shortenUrl(res.expiring_embed_link.url)
        .pipe(
          tap(res => {
            this.addUrl(res);
          }),
          catchError(err => {
            throw err;
          })
        )
        .subscribe()
      }),
      catchError(err => {
        throw err;
      })
    ).subscribe()
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
  }
  
  private uploadFirebase(event) {
    this.firebaseService.upload(event);
  }

  private addUrl(xml: string) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const longUrl = xmlDoc.getElementsByTagName('long');
    const shortUrl = xmlDoc.getElementsByTagName('short');
    this.shareLongUrl = longUrl[0].childNodes[0].nodeValue;
    this.shareShortUrl = shortUrl[0].childNodes[0].nodeValue;
  }

  private openBoxFolder(folder) {
    if (folder.type == 'folder') {
      this.boxService.getFiles(folder.id)
      .subscribe((res: any) => {
        const array = res.entries;
        array.forEach(element => {
          this.boxFiles.push(element);
        });
      })
    }
  }
}
