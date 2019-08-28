import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'app/layouts/navbar/feedback-dialog/feedback.service';
import { IFeedback } from 'app/shared/model/feedback.model';

@Component({
  selector: 'jhi-index',
  templateUrl: './index.component.html',
  styles: []
})
export class IndexComponent implements OnInit {

  feedbacks: IFeedback[];

  constructor(private service: FeedbackService) { }

  ngOnInit() {
    this.service.query().subscribe(res => this.feedbacks = res._embedded.feedback);
  }

}
