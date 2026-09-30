import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ImportRequest, ImportResult } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ImportService {
  constructor(private http: HttpClient) {
  }

  importFromUrl(url: string): Observable<ImportResult> {
    const request: ImportRequest = { url };
    return this.http.post<ImportResult>(`${environment.apiUrl}/import`, request);
  }
}