import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AjaxInterceptorsService {

  constructor(private http: HttpClient, private authser: AuthService, private generalservice: GeneralService) { }

  private httpOptionsWithJson(): HttpHeaders {
    const authToken = this.authser.user_token();
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "localhost",
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${authToken}`,
    });
  }


  private httpOptionsWithString(): HttpHeaders {
    const authToken = this.authser.user_token();
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "localhost",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    });
  }



  private httpOption4fileUpload(): any {
    const authToken = this.authser.user_token();
    return {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.authser.user_token(),
        "Access-Control-Allow-Origin": "localhost",
      }),
      Authorization: "Bearer " + this.authser.user_token(),
    };

  }

  abcd_grid_data(url: string, body: object): Observable<any> {
    const headers: HttpHeaders = this.httpOptionsWithJson();
    const options = { headers };
    return this.http
      .post(url, body, options)
      .pipe(map(this.extractStringData), catchError(this.handleError));
  }


  private extractStringData(res: any) {
    const body = res;
    return body || "";
  }


  private extractData = (res: Response) => {
    const body = res;
    return body || {};
  };


  handleDeleteError = async (error: Response) => {
    if (error["error"]["error"] == "Unauthorized") {
    }
    return error;
  };


  handleError = async (error: HttpErrorResponse) => {
    let valid = true;
    let erHad = undefined;
    try {
      erHad = JSON.parse(error["error"])["error"];
    } catch (e) {
      valid = false;
    }
    try {
      if (!erHad)
        erHad =
          error["status"] == 401 ? "Unauthorized" : error["status"] == 0 ? "InternetLost" : (error["status"] == 500 || error["status"] == 503) ? 'ServerDown' : '';
    } catch (e) {
      valid = false;
    }

    if (erHad == "Unauthorized") {
      this.generalservice.sessionExpired();
    } else if (erHad == "InternetLost") {
      this.generalservice.NetWorkTester();
    } else if (erHad == 'ServerDown') {
      // this.serverDownalert()
    }
    if (error.error instanceof ErrorEvent) {
      // console.error("An error occurred:", error.error.message);
    } else {
      console
        .error
        // `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        ();
    }
    return null;
  };



  ajaxGetMethodwithoutToken(url: string): Observable<any> {
    return this.http
      .get(url)
      .pipe(map(this.extractData), catchError(this.handleDeleteError));
  }

  ajaxPostWithFileWithouttoken(url: string, data: any): Observable<any> {
    return this.http
      .post(url, data)
      .pipe(map(this.extractStringData), catchError(this.handleError));
  }





  ajaxPut(url: string, data: any,): Observable<any> {
    const headers: HttpHeaders = this.httpOptionsWithString();
    const options = { headers };
    return this.http
      .put(url, data, options)
      .pipe(map(this.extractStringData), catchError(this.handleError));
  }


  ajaxget(url: string): Observable<any> {
    const headers: HttpHeaders = this.httpOptionsWithString();
    const options = { headers };
    return this.http
      .get(url, options)
      .pipe(map(this.extractStringData), catchError(this.handleError));
  }
  ajaxPostWithBody(url: string, data: any): Observable<any> {
    const headers: HttpHeaders = this.httpOptionsWithJson();
    const options = { headers };
    return this.http
      .post(url, data, options)
      .pipe(map(this.extractStringData), catchError(this.handleError));
  }

  ajaxPostWithFile(url: string, data: any, logs?: any): Observable<any> {
    const options = this.httpOption4fileUpload()
    return this.http
      .post(url, data, options)
      .pipe(map(this.extractStringData), catchError(this.handleError));

  }

  getImage(url: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: "blob" }).subscribe({
        next: (blob) => resolve(blob),
        error: (error) => reject(error),
      });
    });
  }


}
