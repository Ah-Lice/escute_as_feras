import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HappeningService {

  private apiUrl = 'http://localhost:8080/api/happening';

  constructor(private http: HttpClient) {}

  getCurrentBook(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getComments(bookId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${bookId}/comments`);
  }

  addComment(bookId: number, comment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bookId}/comments`, comment);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${commentId}`);
  }
}
