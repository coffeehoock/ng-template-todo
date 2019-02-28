import {Component, Inject, OnInit, ɵdevModeEqual} from '@angular/core';
import {TodosService} from './todos.service';
import {interval, Observable, of} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';
import {equalSegments} from '@angular/router/src/url_tree';

export function deepEquals(x, y) {
  if (x === y) {
    return true; // if both x and y are null or undefined and exactly the same
  } else if (!(x instanceof Object) || !(y instanceof Object)) {
    return false; // if they are not strictly equal, they both need to be Objects
  } else if (x.constructor !== y.constructor) {
    // they must have the exact same prototype chain, the closest we can do is
    // test their constructor.
    return false;
  } else {
    for (const p in x) {
      if (!x.hasOwnProperty(p)) {
        continue; // other properties were tested using x.constructor === y.constructor
      }
      if (!y.hasOwnProperty(p)) {
        return false; // allows to compare x[ p ] and y[ p ] when set to undefined
      }
      if (x[p] === y[p]) {
        continue; // if they have the same strict value or identity then they are equal
      }
      if (typeof (x[p]) !== 'object') {
        return false; // Numbers, Strings, Functions, Booleans must be strictly equal
      }
      if (!deepEquals(x[p], y[p])) {
        return false;
      }
    }
    for (const p in y) {
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('appear', [

      /* enter */
      transition(':enter', [
        style({
          width: 0,
          height: 0,
          opacity: 0
        }),

        animate('200ms', style({
          height: '*',
          width: '*'
        })),
        animate('400ms', style({
          opacity: 1
        }))
      ]),

      /* leave */
      transition(':leave', [
        style({
          height: '*',
          width: '*',
          opacity: 1
        }),

        animate('400ms', style({
          opacity: 0
        })),
        animate('200ms', style({
          height: 0,
          width: 0
        }))

      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  public  todos = [];
  public title: string;

  constructor( @Inject( TodosService ) private todosService ) {}

  ngOnInit(): void {

    this.todosService.getTodos().subscribe( data => this.todos = data );

    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.todosService.getTodos() )
      )
      .subscribe(res => {

        /**
         * @delete
         * @create
         * @edit
         * */
        Object.keys( res ).map(key => {
          if ( !this.todos[key] ) { this.todos.push(res[key]); }
        });

        Object.keys( this.todos ).map(key => {
          // @ts-ignore
          if ( this.todos.length !== res.length ) {
            // console.log( this.todos.length !== res.length );
            if ( !res[key] ) {
              const index: number = this.todos.indexOf( this.todos[key] );

              if ( index > -1 ) {

                this.todos.splice(index, 1);
              }
            } else {
              if ( this.todos[key].id !== res[key].id || res[key] === undefined ) {

                const index: number = this.todos.indexOf( this.todos[key] );

                if ( index > -1 ) {

                  this.todos.splice(index, 1);
                }
              }

            }
          } /*else {

            if ( !deepEquals( res,  this.todos) )  {
              for ( let x in res[key] ) {
                if ( this.todos[key][x] !== res[key][x]  ) {
                  this.todos[key][x] = res[key][x];
                }
              }
            }
          }*/
        });

      });
  }

  create( title: string ) {
    this.todosService.createTodo(title).subscribe( todo => this.todos.push(todo) );
  }

  toggle( todo: any, e ) {
    e.preventDefault();
    this.todosService.toggleTodo( todo ).subscribe( res => {
      return e.target.checked = +res.completed;
    });
  }

  delete( todo: any ) {

    this.todosService.deleteTodo( todo ).subscribe( res => {
      const index: number = this.todos.indexOf( todo );

      if ( index > -1 ) {
        this.todos.splice(index, 1);
      }

    });
  }

}
