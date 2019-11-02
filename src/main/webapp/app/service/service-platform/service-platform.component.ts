import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IFile } from 'app/shared/model/file.model';
import { ServicePlatformService } from './service-platform.service';

@Component({
  selector: 'jhi-service-platform',
  templateUrl: './service-platform.component.html',
  styleUrls: ['./service-platform.component.css']
})
export class ServicePlatformComponent implements OnInit {

   // url for plain images.
   public platformUrl = SERVER_API_URL + 'api/images/platform';

   fileForm: FormGroup;

   file: any;
   images: IFile[];
   nameOfImages: string[];

   constructor(protected http: HttpClient,
           private formBuilder: FormBuilder,
           public service: ServicePlatformService) {
   }

   delete(filename: string) {
    //    return this.http.delete<any>(`${this.resourceUrl}/${filename}`, { observe: 'response' });

    }

   upload(file: any): Observable<HttpResponse<any>> {
       return this.http.post<any>(`${this.platformUrl}`, file);
   }

   // get all plain images path and name
   getImages() {
        this.service.load().subscribe((res: HttpResponse<IFile[]>) => {
            this.images = res.body;
        });
        return;
   }

   onFileChange(event) {
       if (event.target.files.length > 0) {
         const file = event.target.files[0];
         this.fileForm.get('image').setValue(file);
       }
   }

   onSubmit() {
       const formData = new FormData();
       formData.append('image', this.fileForm.get('image').value);
       this.upload(formData).subscribe(
           any => this.getImages()
       );
   }

   ngOnInit() {
       this.fileForm = this.formBuilder.group({
           image: ['']
       });
       this.getImages();
    }

}
