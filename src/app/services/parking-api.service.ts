import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParkingLot} from '../models/parking-lot';

@Injectable({
  providedIn: 'root'
})
export class ParkingApiService {

  constructor(private http: HttpClient) { }

  getParkingLots(): Observable<ParkingLot[]> {
    return this.http.get<ParkingLot[]>('http://localhost:8058/pp/v1/generateParkingLot');
  }
}
