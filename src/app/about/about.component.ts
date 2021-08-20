import { Component, OnInit,Input } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeadersService } from '../services/leaders.service'; 
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
@Input()
leader:Leader[];
  constructor(private leaderService:LeadersService) { }

  ngOnInit() {
    this.leader = this.leaderService.getLeaders();
  }

}
