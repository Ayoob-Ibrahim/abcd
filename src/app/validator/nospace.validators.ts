import { FormControl } from "@angular/forms";


//function type with decalrinf varibale

export const nospaceallowed = (ctrl: FormControl) => {
    if (ctrl.value && ctrl.value.indexOf(' ') != -1) {
        return { nospaceallowed: true };
    }
    return null;
}


// class combined with method type


export class validatorcls {
    static nospaceallowed(ctrl: FormControl) {
        if (ctrl.value && ctrl.value.indexOf(' ') != -1) {
            return { nospaceallowed: true };
        }
        return null;
    }

}

