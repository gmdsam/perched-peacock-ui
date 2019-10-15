import { Component, OnInit } from '@angular/core';
import {ParkingApiService} from '../../services/parking-api.service';
import {FormControl, Validators} from '@angular/forms';
import {ParkingLot} from '../../models/parking-lot';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {ParkingInfo} from '../../models/parking-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  constructor(private parkingService: ParkingApiService) {}

  options: ParkingLot[] = [];
  filteredOptions: string[];
  time: string[] = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                    '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                    '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
  minDate = new Date();
  location = '';
  availability: boolean;
  booking: boolean;
  parkingInfo: ParkingInfo = {
    arrivalDate: null,
    arrivalTime: '',
    departureDate: null,
    departureTime: '',
    vehicleNumber: 0,
    vehicleType: 'car',
    phoneNumber: 0,
    locality: '',
    city: ''
  };

  ngOnInit(): void {
    this.parkingService.getParkingLots().subscribe(response => {
      this.options = response;
    });
  }

  public _filter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredOptions = this.options
      .filter(option => option.city.toLowerCase().includes(filterValue) ||
        option.locality.toLowerCase().includes(filterValue))
      .map(option => option.locality + ', ' + option.city);
  }

  isValid() {
    let value = this.parkingInfo.arrivalDate > this.parkingInfo.departureDate;
    if (!value) {
      value = this.parkingInfo.arrivalDate < this.parkingInfo.departureDate;
      if (!value) {
        value = this.parkingInfo.arrivalTime < this.parkingInfo.departureTime;
      }
    } else {
      value = false;
    }
    return !!this.location && !!this.parkingInfo.arrivalDate && !!this.parkingInfo.arrivalTime && !!this.parkingInfo.departureDate &&
      !!this.parkingInfo.departureTime && value;
  }

  setParkingInfo() {
    [this.parkingInfo.locality, this.parkingInfo.city] = this.location.split(', ');
  }
  checkAvailability(): void {
    this.booking = false;
    this.setParkingInfo();
    this.parkingService.checkParking(this.parkingInfo).subscribe(response => {
      this.availability = response;
    });
  }

  book() {
    this.parkingService.bookParking(this.parkingInfo).subscribe(response => {
      this.booking = response;
    });
  }
}
