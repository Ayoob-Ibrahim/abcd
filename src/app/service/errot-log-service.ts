import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class errorlog {

    http: HttpClient = inject(HttpClient)
    logerror(data: { statusCode: number, errorMessage: string, datetime: Date }) {
        this.http.post(`https://abcd2-framwork-default-rtdb.firebaseio.com/logs.json`,
            data
        ).subscribe()
    }

    fetcherror() {
        this.http.get(`https://abcd2-framwork-default-rtdb.firebaseio.com/logs.json`).subscribe({
            next: (res => {
                console.log(res)
            })
        })
    }

}