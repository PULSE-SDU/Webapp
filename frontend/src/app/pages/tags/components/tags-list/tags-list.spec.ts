import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsList } from './tags-list';

describe('TagsList', () => {
  let component: TagsList;
  let fixture: ComponentFixture<TagsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsList],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
