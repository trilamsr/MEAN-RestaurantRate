import { Component, OnInit } from '@angular/core';
import { HttpService } from './../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {
  restaurant: any;
  reviewToggle: boolean;
  reviewObject: any;
  Error: boolean
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.restaurant = { restaurantName: '', cuisine: '', reviews: [] };
    this.setRestaurant();
    this.reviewObject = {
      reviewerName: '',
      rating: 1,
      content: ''
    };
  }
  resetReview() {
    this.reviewObject = {
      reviewerName: '',
      rating: 1,
      content: ''
    };
  }


  setRestaurant() {
    const RestaurantId = this.route.snapshot.params.id;
    const obs = this.http.oneRestaurant(RestaurantId);
    obs.subscribe((data: any) => {
      if (data.message === 'success') {
        data.data.reviews.sort((a, b) => a.rating < b.rating);
        this.restaurant = data.data;
      } else {
        this.NavigateToHome();
      }
    });
  }
  NavigateToHome() {
    this.router.navigate([`/home/`]);
  }
  addReview() {
    const obs = this.http.addReview(this.restaurant._id, this.reviewObject);
    obs.subscribe((data: any) => {
      if (data.message === 'success') {
        this.setRestaurant();
        this.reviewToggle = !this.reviewToggle;
      } else {
        this.Error = true;
      }
    });
  }
}
