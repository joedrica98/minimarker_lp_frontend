import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimarketComponent } from './minimarket.component';

describe('MinimarketComponent', () => {
  let component: MinimarketComponent;
  let fixture: ComponentFixture<MinimarketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinimarketComponent]
    });
    fixture = TestBed.createComponent(MinimarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
