import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    return of({});
  }

}
