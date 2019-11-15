import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  allRestaurants() {
    return this.http.get(`/api/restaurants`);
  }

  createRestaurant(restaurant) {
    return this.http.post(`/api/restaurants`, restaurant);
  }

  oneRestaurant(restaurantID: string) {
    return this.http.get(`/api/restaurants/${restaurantID}`);
  }

  editRestaurant(restaurantID: string, updatedInfo) {
    return this.http.put(`/api/restaurants/${restaurantID}`, updatedInfo);
  }

  deleteRestaurant(restaurant) {
    return this.http.delete(`/api/restaurants/${restaurant._id}`);
  }
  addReview(restaurantID, quote) {
    return this.http.post(`/api/restaurants/review/${restaurantID}`, quote);
  }
}
