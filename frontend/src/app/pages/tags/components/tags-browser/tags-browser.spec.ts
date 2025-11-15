import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsBrowser } from './tags-browser';

describe('TagsBrowser', () => {
  let component: TagsBrowser;
  let fixture: ComponentFixture<TagsBrowser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsBrowser],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsBrowser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
