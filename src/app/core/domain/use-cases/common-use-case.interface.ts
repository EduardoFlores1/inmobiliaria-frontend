import { Observable } from 'rxjs';

export interface ICommonUseCases<C, E> {
  readAll(): Observable<E[]>;
  readById(id: number): Observable<E>;
  create(c: C): Observable<E>;
  update(id: number, e: E): Observable<E>;
  deleteById(id: number): Observable<void>;
}