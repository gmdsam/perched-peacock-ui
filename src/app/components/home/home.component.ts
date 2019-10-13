import { Component, OnInit } from '@angular/core';
import {ParkingApiService} from '../../services/parking-api.service';
import {FormControl} from '@angular/forms';
import {ParkingLot} from '../../models/parking-lot';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private parkingService: ParkingApiService) {}

  myControl = new FormControl();
  options: ParkingLot[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.parkingService.getParkingLots().subscribe(response => {
      this.options = response;
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options
      .filter(option => option.city.toLowerCase().includes(filterValue) ||
        option.locality.toLowerCase().includes(filterValue))
      .map(option => option.locality + ', ' + option.city);
  }
}
