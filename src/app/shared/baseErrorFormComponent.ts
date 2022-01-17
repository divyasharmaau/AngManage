import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    template: ''
})  
export class BaseErrorFormComponent {

    // the form model
    form: FormGroup;
 
    constructor() {
    }

    // retrieve a FormControl
    getControl(feild: string) {
        return this.form.get(feild);
    }

    hasError(feild: string) {
        var e = this.getControl(feild);
        return e && (e.dirty || e.touched) && e.invalid;
        //return e && (e.dirty && e.errors);
    }

    hasErrorPattern(feild: string){
        var e = this.form.get(feild);
        return e && (e.errors.pattern);
    }
}
