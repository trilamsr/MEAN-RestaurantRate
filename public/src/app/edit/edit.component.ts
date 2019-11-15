import { Component, OnInit } from '@angular/core';
import { HttpService } from './../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  restaurant: any;
  savedData: {
    restaurantName: string;
    restaurantCuisine: string;
    restaurantId: string;
  };
  Error: boolean;
  data: any;
  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurant = {
      restaurantName: '',
      cuisine: ''
    };
    this.savedData = {
      restaurantName: '',
      restaurantCuisine: '',
      restaurantId: ''
    };
    this.setRestaurant();
  }

  setRestaurant() {
    const RestaurantId = this.route.snapshot.params.id;
    const obs = this.http.oneRestaurant(RestaurantId);
    obs.subscribe((data: any) => {
      if (data.message === 'success') {
        this.data = data;
        this.savedData = {
          restaurantName: data.data.restaurantName,
          restaurantCuisine: data.data.cuisine,
          restaurantId: data.data._id,
        };
        this.restaurant.restaurantName = data.data.restaurantName;
        this.restaurant.cuisine = data.data.cuisine;
      } else {
        this.NavigateToHome();
      }
    });
  }

  Submit() {
    console.log(this.savedData);
    const obs = this.http.editRestaurant(this.savedData.restaurantId, this.restaurant);
    obs.subscribe((data: any) => {
      if (data.message === 'success') {
        this.NavigateToHome();
        this.router.navigate([`/home/`]);
      } else {

        this.Error = true;
      }
    });
  }
  NavigateToHome() {
    this.router.navigate([`/home/`]);
  }
}
