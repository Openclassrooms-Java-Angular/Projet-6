import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TopicService } from 'src/app/services/topic.service';


@Component({
  selector: 'app-topic-profile',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './topic-profile.component.html',
  styleUrl: './topic-profile.component.scss',
})
export class TopicProfileComponent {
  @Input({ required: true }) topic!: any;
  @Output() unsubscribed = new EventEmitter<number>();

  constructor(private router: Router, private topicService: TopicService) { }

  toggleSubscription(topic: any): void {
    if (topic.subscribed) {
      this.topicService.unsubscribe(topic.id).subscribe(() => {
        topic.subscribed = false;
        this.unsubscribed.emit(topic.id);
      });
    } else {
      this.topicService.subscribe(topic.id).subscribe(() => {
        topic.subscribed = true;
      });
    }
  }
}
