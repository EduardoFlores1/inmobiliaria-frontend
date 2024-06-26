import { Observable } from 'rxjs';

export abstract class CommonRepository<E, C> {

  abstract create(e: C): Observable<E>;
  abstract readAll(): Observable<E[]>;
  abstract readById(id: number): Observable<E>;
  abstract update(id: number, e: E): Observable<E>;
  abstract deleteById(id: number): Observable<void>;

}