import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IImage } from 'app/shared/model/image.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IFile } from 'app/shared/model/file.model';

@Component({
  selector: 'jhi-service-platform',
  templateUrl: './service-platform.component.html',
  styleUrls: ['./service-platform.component.css']
})
export class ServicePlatformComponent implements OnInit {

   // url for plain images.
   public resourceUrl = SERVER_API_URL + 'api/images';

   // url for applications
   public applicationUrl = SERVER_API_URL + 'api/images/application';

   fileForm: FormGroup;

   file: any;
   applications: IFile[];
   images: IImage[];
   nameOfImages: string[];

   constructor(protected http: HttpClient,
           private formBuilder: FormBuilder) {
       this.getImages();
       this.getApplications();
   }

   delete(filename: string): Observable<HttpResponse<any>> {
       return this.http.delete<any>(`${this.resourceUrl}/${filename}`, { observe: 'response' });
   }

   upload(file: any): Observable<HttpResponse<any>> {
       return this.http.post<any>(`${this.resourceUrl}`, file);
   }

   applicationUpload(file: any): Observable<HttpResponse<any>> {
       return this.http.post<any>(`${this.applicationUrl}`, file);
   }

   // get all plain images path and name
   getImages(): Observable<HttpResponse<IImage[]>> {
       this.http.get<IImage[]>(this.resourceUrl)
           .subscribe(res => this.images = res);
       return;
   }

   // get all applications name and path
   getApplications(): Observable<HttpResponse<IFile[]>> {
       this.http.get<IFile[]>(this.applicationUrl)
           .subscribe(res => this.applications = res);
       return;
   }

   confirmDelete(filename: string) {
       this.delete(filename).subscribe(
           any => this.getImages()
       );
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

   onApplicationSubmit() {
       const formData = new FormData();
       formData.append('image', this.fileForm.get('image').value);
       this.applicationUpload(formData).subscribe(
           any => this.getImages()
       );
   }

   ngOnInit() {
       this.fileForm = this.formBuilder.group({
           image: ['']
       });
   }

}
