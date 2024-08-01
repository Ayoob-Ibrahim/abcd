import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { opencloseanimation } from '../../animation/animation';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { nospaceallowed, validatorcls } from '../../validator/nospace.validators';
import { asyncvalidatorcls } from '../../validator/async.validators';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { errorlog } from '../../service/errot-log-service';
@Component({
  selector: 'app-open-layer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './open-layer.component.html',
  styleUrl: './open-layer.component.scss',
  animations: opencloseanimation
})
export class OpenLayerComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.fetechjson();
  }
  profileform: FormGroup;

  ngOnInit(): void {
    this.profileform = new FormGroup({
      firstName: new FormControl('Ayoob', [Validators.required, nospaceallowed]),
      lastName: new FormControl('Ibrahim'),
      country: new FormControl('usa'),
      username: new FormControl('', [Validators.required, validatorcls.nospaceallowed,], asyncvalidatorcls.check4userName),
      skills: new FormArray([
        new FormControl('')
      ]),
    })
  }


  http: HttpClient = inject(HttpClient)
  onSubmit(): void {
    const headers = new HttpHeaders({
      'my-headers': "demo-headers"
    })
    this.http.post<{ name: string }>(`https://abcd2-framwork-default-rtdb.firebaseio.com/profile.json`,
      this.profileform.value,
      { headers: headers }
    ).subscribe(res => {
      if (res.name)
        this.fetechjson()
    })
  }

  errorlogser: errorlog = inject(errorlog)
  fetechjson(): void {

    // one of the way for setting a headers
    const headers_ = new HttpHeaders({
      "Access-Control-Allow-Origin": "localhost",
      "Content-Type": "application/json",
      Authorization: `Bearer dczxczcsadfsdfksdlfkdslkflsdkfldskflkdflkdslfkdslkfldskfldskflkdsl`,
    })


    //another way
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*')
    // we can use append method also inorder to set a headers



    //setting up a query params
    let queryparams = new HttpParams();
    queryparams = queryparams.set('page', 1);
    queryparams = queryparams.set('item', 4);


    this.http.get<{ [key: string]: Object }>(`https://abcd2-framwork-default-rtdb.firebaseio.com/profile.json`,
      {
        headers: headers,
        params: queryparams
      }
    )
      .pipe(map(res => {
        let arr = [];
        for (let key in res) {
          if (res.hasOwnProperty(key))
            arr.push({ id: key, ...res[key] });
        }
        return arr;
      }),
        catchError((error: HttpErrorResponse) => {
          this.errorlogser.logerror({
            statusCode: error.status,
            errorMessage: error.message,
            datetime: new Date()
          })
          return throwError(() => error)
        })
      )
      .subscribe({
        next: resp => {
          console.log(resp)
        },
        error: err => {
          console.warn(err)
        }
      })
  }

  deletecollection(id: string) {
    this.http.delete(`https://abcd2-framwork-default-rtdb.firebaseio.com/profile/${id}.json`).subscribe()
  }

  addskills(): void {

    (<FormArray>this.profileform.get('skills')).push(new FormControl(''));
  }
}
