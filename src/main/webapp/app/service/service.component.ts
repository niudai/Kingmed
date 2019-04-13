import { SERVER_API_URL } from 'app/app.constants';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-service',
  templateUrl: './service.component.html',
  styleUrls: ['service.css']
})
export class ServiceComponent implements OnInit {
  public resourceUrl = SERVER_API_URL + 'api/images';

  afuConfig: any;
  constructor() {
    this.afuConfig = {
        uploadAPI: {
            url: this.resourceUrl
        }
      };
   }

  
  ngOnInit() {
  }

}
