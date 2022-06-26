import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderChatComponent } from './sender-chat.component';

describe('SenderChatComponent', () => {
  let component: SenderChatComponent;
  let fixture: ComponentFixture<SenderChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
