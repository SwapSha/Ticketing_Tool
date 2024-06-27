import { TestBed } from '@angular/core/testing';

import { ParentApiIntegrationService } from './parent-api-integration.service';

describe('ParentApiIntegrationService', () => {
  let service: ParentApiIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentApiIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
