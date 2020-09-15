import { TestBed } from '@angular/core/testing';

import { CajeroAutomaticoService } from './cajero-automatico.service';

describe('CajeroAutomaticoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CajeroAutomaticoService = TestBed.get(CajeroAutomaticoService);
    expect(service).toBeTruthy();
  });
});
