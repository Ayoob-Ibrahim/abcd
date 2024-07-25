import { AbstractControl } from "@angular/forms";




// async validator must return promise or observable
// async validator must br the third argumet of the form cotnrol absctract





export class asyncvalidatorcls {
    static check4userName(control: AbstractControl): Promise<any> {
        //this control contains all the abstract properties like controls,errors,value,invalid etc..
        return usernameTaken(control.value)
    }
}



function usernameTaken(userName: string) {
    const takenusers = ['ayoob', 'ali', 'andy'];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (takenusers.includes(userName))
                resolve({
                    checkusername: true
                })
            else
                resolve(null)
        }, 5000);
    })
}