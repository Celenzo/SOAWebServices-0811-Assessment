import { Injectable } from '@angular/core';
import { Dropbox } from 'dropbox';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  private dbx: Dropbox;

  constructor() { 
    const dropboxToken = 'ULObYGBWOVAAAAAAAAAACM3ZryGqod0W0hCiE-l9mfKYQkJQp74QS0qI3BIShQyy';
    this.dbx = new Dropbox({ accessToken: dropboxToken });
  }

  public getFiles() {
    return this.dbx.filesListFolder({path: ''});
  }

  public shareLink(link) {

    return this.dbx.sharingGetSharedLinks({ path: link.path_display })
    .then((res) => {
      return res;
    }).then((links: any) => {
      if (links.links.length > 0) {
        return links.links[0];
      } else {
        return this.dbx.sharingCreateSharedLinkWithSettings({ path: link.path_display })
        .then(newLink => {
            return newLink
        });
      }
    });
  }
}
