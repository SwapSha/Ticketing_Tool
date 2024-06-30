import { TestBed } from '@angular/core/testing';

import { TicketIntegrationService } from './ticket-integration.service';

describe('TicketIntegrationService', () => {
  let service: TicketIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
