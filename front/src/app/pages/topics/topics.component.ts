import { Component, OnInit } from "@angular/core";
import { TopicService } from "src/app/services/topic.service";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-topics',
    standalone: true,
    templateUrl: './topics.component.html',
    styleUrl: './topics.component.scss',
    imports: [
        CommonModule,
        MatCardModule
    ],
})
export class TopicsComponent implements OnInit {

  topics: any[] = [];
  loading = false;

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.loading = true;

    this.topicService.getAll().subscribe({
      next: (data) => {
        this.topics = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

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