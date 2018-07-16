import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})

export class TodoFooterComponent implements OnInit {

  pendiente: number;
  completado = true;
  filtrosValidos: fromFiltro.filtrosValidos [] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(nuevofiltro: fromFiltro.filtrosValidos) {

    const accion = new fromFiltro.SetFiltroAction(nuevofiltro);
    this.store.dispatch(accion);
  }

  contarPendientes (todos: Todo[]) {
    this.pendiente = todos.filter( todo => !todo.completado ).length;
  }

  LimpiarCompletos() {
    const accion = new fromTodo.LimpiarCompletadoTodoAction();
    this.store.dispatch(accion);
  }
}
