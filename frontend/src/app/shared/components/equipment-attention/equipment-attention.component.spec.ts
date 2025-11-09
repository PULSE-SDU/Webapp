import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAttentionComponent } from './equipment-attention.component';

describe('EquipmentAttentionComponent', () => {
  let component: EquipmentAttentionComponent;
  let fixture: ComponentFixture<EquipmentAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentAttentionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
