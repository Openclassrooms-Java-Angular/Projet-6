import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicProfileComponent } from './topic-profile.component';

describe('TopicProfileComponent', () => {
  let component: TopicProfileComponent;
  let fixture: ComponentFixture<TopicProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
