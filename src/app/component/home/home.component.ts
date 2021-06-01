import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  public sort:string ="test";
  public games:Array<Game>=[];
  public routeSub:Subscription | undefined;
  public gameSub:Subscription | undefined;

  constructor(private httpService:HttpService,private activatedRoute:ActivatedRoute,private router:Router) { }
  

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params:Params)=>{
      if(params["search-games"]){
        this.searchGames("metacrit",params["search-games"]);

      }else{
        this.searchGames("metacrit");

      }

    })
  }

  searchGames(sort:string,search?:string):void{
    this.gameSub = this.httpService.getGameList(sort,search).subscribe((gameList:APIResponse<Game>)=>{
      console.log(gameList);
      this.games = gameList.results;

    })

  }

  openGameDetails(id:string):void{
    this.router.navigate(['details',id]);

  }

  ngOnDestroy(){
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }

  }

}
