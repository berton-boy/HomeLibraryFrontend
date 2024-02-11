import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Pipe({
  name: 'securePipe'
})
export class SecurePipePipe implements PipeTransform {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url): Observable<SafeUrl> {
    if (url.includes('localhost')) {
      return this.http.get(url, { responseType: 'blob' }).pipe(
        map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
      );
    } else {
      return new Observable(observer => {
        observer.next(url);
        observer.complete();
      });
    }
  }

}
