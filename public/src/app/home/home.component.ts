import { Component, OnInit } from '@angular/core';
import { HttpService } from './../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allRestaurant: any;
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.getAllRestaurant();
  }
  getAllRestaurant() {
    const obs = this.http.allRestaurants();
    obs.subscribe((data: any) => {
      if (data.message === 'success') {
        this.allRestaurant = data.data;
        this.setDeletable();
      }
    });
  }
  setDeletable() {
    for (let restaurant of this.allRestaurant) {
      restaurant.deletable = (Date.now() - Number(new Date(restaurant.createdAt))) < 30000;
    }
  }


  Reviews(restaurant) {
    this.router.navigate([`/one/${restaurant._id}`]);
  }
  Edit(restaurant) {
    this.router.navigate([`/home/edit/${restaurant._id}`]);
  }
  Delete(restaurant) {
    const obs = this.http.deleteRestaurant(restaurant);
    obs.subscribe((data: any) => {
      if (data.message === 'success') {
        this.getAllRestaurant();
      }
    });
  }
}
