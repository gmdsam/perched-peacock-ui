import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParkingLot} from '../models/parking-lot';
import {ParkingInfo} from '../models/parking-info';

const url = 'https://perched-peacock-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class ParkingApiService {

  constructor(private http: HttpClient) { }

  getParkingLots(): Observable<ParkingLot[]> {
    return this.http.get<ParkingLot[]>(url + '/pp/v1/generateParkingLot');
  }

  checkParking(parkingInfo: ParkingInfo): Observable<boolean> {
    return this.http.get<boolean>(url + '/pp/v1/park', {
      params: {
        arrivalDate: parkingInfo.arrivalDate.toDateString(),
        arrivalTime: parkingInfo.arrivalTime,
        departureDate: parkingInfo.departureDate.toDateString(),
        departureTime: parkingInfo.departureTime,
        locality: parkingInfo.locality,
        city: parkingInfo.city
      }
    });
  }

  bookParking(parkingInfo: ParkingInfo): Observable<boolean> {
    console.log(parkingInfo);
    return this.http.post<boolean>(url + '/pp/v1/park', {
        arrivalDate: parkingInfo.arrivalDate.toDateString(),
        arrivalTime: parkingInfo.arrivalTime,
        departureDate: parkingInfo.departureDate.toDateString(),
        departureTime: parkingInfo.departureTime,
        vehicleNumber: parkingInfo.vehicleNumber,
        locality: parkingInfo.locality,
        city: parkingInfo.city
    });
  }
}
