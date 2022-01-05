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
    getControl(feildInput: string) {
        return this.form.get(feildInput);
    }

    hasError(feildInput: string) {
        var e = this.getControl(feildInput);
        return e && (e.dirty || e.touched) && e.invalid;
       // return e && (e.dirty && e.errors);
    }

}
