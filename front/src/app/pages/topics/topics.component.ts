import { Component, OnInit } from "@angular/core";
import { TopicService } from "src/app/services/topic.service";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "src/app/core/navbar/navbar.component";
import { TopicComponent } from "src/app/core/topic/topic.component";

@Component({
  selector: 'app-topics',
  standalone: true,
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
  imports: [
    NavbarComponent,
    TopicComponent,
    CommonModule,
    MatCardModule
  ],
})
export class TopicsComponent implements OnInit {

  topics: any[] = [];
  loading = false;

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.loading = true;

    this.topicService.getAll().subscribe({
      next: (data) => {
        this.topics = data;
        console.log('Topics chargés :', this.topics);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}