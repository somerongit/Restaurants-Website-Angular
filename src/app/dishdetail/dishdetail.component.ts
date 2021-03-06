import { Comment } from '../shared/comment';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  commentForm: FormGroup;
  prev: string;
  dishIds: string[];
  next: string;
  comment: Comment;
  @ViewChild('cform') commentFormDirective;


  validationMessages = {
    'comment': {
      'required': 'Fill in Your Comment.',
    },
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long.',
      'maxlength': 'Author name cannot be more than 25 characters long.'
    },
  };

  formErrors = {
    'comment': '',
    'author': ''
  };



  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { this.createForm(); }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
      rating: 5,
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],

    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    let date = new Date().toISOString();
    this.comment = this.commentForm.value;
    this.comment.date = date;
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
      comment: '',
      rating: 5,
      author: ''
    });
    this.commentFormDirective.resetForm(this.commentForm.value);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
