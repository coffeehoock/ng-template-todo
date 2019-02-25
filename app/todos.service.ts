import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  baseUrl = 'http://188.243.241.229';
  apiUri = '/example-api-master/public/api/';
  itemsUri = 'articles';

  API = this.baseUrl + this.apiUri + this.itemsUri;

  constructor( @Inject( HttpClient ) private http ) { }

  getTodos(): Observable<any> {
    return this.http.get( this.API );
  }

  createTodo( title: string ): Observable<any> {
    return this.http.post( `${this.API}?title=${title}`);
  }

  toggleTodo( todo ): Observable<any[]> {
    // @ts-ignore
    todo.completed = !todo.completed - 0;

    // if ( todo.completed ) {
    //   todo.completed = 1;
    // } else {
    //   todo.completed = 0;
    // }
    return this.http.put( `${this.API}/${todo.id}?completed=${todo.completed}` );
  }

  deleteTodo( todo: any ) {
    return this.http.delete( `${this.API}/${todo.id}` );
  }

}
