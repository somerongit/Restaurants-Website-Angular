import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { LeadersService } from '../services/leaders.service';
import { PromotionService } from '../services/promotion.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dishErrMess:string;
  dish: Dish;
  leader: Leader;
  promotion: Promotion;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeadersService,
    @Inject('BaseURL') private BaseURL,
  ) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        disherrMess=>this.dishErrMess=<any>disherrMess);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader);
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion);
  }

}
