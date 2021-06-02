import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment as env}  from '../../environments/environment.prod'
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getGameList(ordering:string,search?:string): Observable<APIResponse<Game>>{

    let params = new HttpParams().set("ordering",ordering);

    if(search){
      params = new HttpParams().set("ordering",ordering).set("search",search);

    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games?odering=rating`,{
      params:params
    });
    
  }

  getGameDetails(id:string):Observable<Game>{
    let gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    let gameTrailerRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    let gamesScreenshotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);
    return forkJoin({
      gameInfoRequest,
      gameTrailerRequest,
      gamesScreenshotsRequest
    }).pipe(
      map((resp:any)=>{
        return({
          ...resp['gameInfoRequest'],
          screenshots: resp['gamesScreenshotsRequest'],
          trailers: resp['gameTrailerRequest']
        })
      })
    )

  }
}
