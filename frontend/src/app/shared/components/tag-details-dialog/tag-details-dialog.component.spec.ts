import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagDetailsDialogComponent } from './tag-details-dialog.component';

describe('TagDetailsDialogComponent', () => {
  let component: TagDetailsDialogComponent;
  let fixture: ComponentFixture<TagDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagDetailsDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            tagId: 'TAG-001',
            equipmentName: 'Test Equipment',
            type: 'Test Type',
            location: 'Test Location',
            batteryLevel: 50,
            status: 'normal',
            prediction: '5 days remaining',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TagDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

