import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverChatComponent } from './receiver-chat.component';

describe('ReceiverChatComponent', () => {
  let component: ReceiverChatComponent;
  let fixture: ComponentFixture<ReceiverChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
