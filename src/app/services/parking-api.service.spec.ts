import { TestBed } from '@angular/core/testing';

import { ParkingApiService } from './parking-api.service';

describe('ParkingApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkingApiService = TestBed.get(ParkingApiService);
    expect(service).toBeTruthy();
  });
});
