import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCreate } from './quick-create';

describe('QuickCreate', () => {
  let component: QuickCreate;
  let fixture: ComponentFixture<QuickCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
