import { Component, OnInit } from '@angular/core';
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

  dish: Dish;
  leader: Leader;
  promotion: Promotion;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeadersService,
  ) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .then(dish => this.dish = dish);
    this.leaderservice.getFeaturedLeader()
      .then(leader => this.leader = leader);
    this.promotionservice.getFeaturedPromotion()
      .then(promotion => this.promotion = promotion);
  }

}
