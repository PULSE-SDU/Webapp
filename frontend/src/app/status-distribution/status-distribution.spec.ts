import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDistribution } from './status-distribution';

describe('StatusDistribution', () => {
  let component: StatusDistribution;
  let fixture: ComponentFixture<StatusDistribution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusDistribution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDistribution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
