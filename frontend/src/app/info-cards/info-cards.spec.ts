import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCards } from './info-cards';

describe('InfoCards', () => {
  let component: InfoCards;
  let fixture: ComponentFixture<InfoCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
