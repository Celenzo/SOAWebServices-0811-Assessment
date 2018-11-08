import { TestBed, inject } from '@angular/core/testing';

import { UrlShortenService } from './url-shorten.service';

describe('UrlShortenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlShortenService]
    });
  });

  it('should be created', inject([UrlShortenService], (service: UrlShortenService) => {
    expect(service).toBeTruthy();
  }));
});
