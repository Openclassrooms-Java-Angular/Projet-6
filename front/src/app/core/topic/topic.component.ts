import { Component, Input } from '@angular/core';
import { Topic } from 'src/app/models/Topic.model';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TopicService } from 'src/app/services/topic.service';


@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
})
export class TopicComponent {
  @Input({ required: true }) topic!: any;

  constructor(private router: Router, private topicService: TopicService) { }

  toggleSubscription(topic: any): void {
    if (topic.subscribed) {
      this.topicService.unsubscribe(topic.id).subscribe(() => {
        topic.subscribed = false;
      });
    } else {
      this.topicService.subscribe(topic.id).subscribe(() => {
        topic.subscribed = true;
      });
    }
  }
}
