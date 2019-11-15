import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newRestaurant: any;
  Error: boolean;
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.newRestaurant = {
      restaurantName: '',
      cuisine: '',
    };
  }
  Submit() {
    const obs = this.http.createRestaurant(this.newRestaurant);
    obs.subscribe((data: any) => {
      if (data.message === 'success') {
        this.NavigateToRestaurant(data.data._id);
      } else {
        this.Error = true;
      }
    });
  }

  NavigateToRestaurant(id) {
    this.router.navigate([`/one/${id}`]);
  }
}
