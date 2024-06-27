import { TestBed } from '@angular/core/testing';

import { ChildApiIntegrationService } from './child-api-integration.service';

describe('ChildApiIntegrationService', () => {
  let service: ChildApiIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildApiIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
