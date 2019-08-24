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

   fileForm: FormGroup;

   file: any;
   images: IImage[];
   nameOfImages: string[];

   constructor(protected http: HttpClient,
           private formBuilder: FormBuilder) {
       this.getImages();
   }

   delete(filename: string): Observable<HttpResponse<any>> {
       return this.http.delete<any>(`${this.resourceUrl}/${filename}`, { observe: 'response' });
   }

   upload(file: any): Observable<HttpResponse<any>> {
       return this.http.post<any>(`${this.resourceUrl}`, file);
   }


   // get all plain images path and name
   getImages(): Observable<HttpResponse<IImage[]>> {
       this.http.get<IImage[]>(this.resourceUrl)
           .subscribe(res => this.images = res);
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


   ngOnInit() {
       this.fileForm = this.formBuilder.group({
           image: ['']
       });
   }

}
