import { Observable } from 'rxjs';

export interface ICommonApiService<C, M> {
  readAll(): Observable<M[]>;
  readById(id: number): Observable<M>;
  create(c: C): Observable<M>;
  update(id: number, m: M): Observable<M>;
  deleteById(id: number): Observable<void>;
}