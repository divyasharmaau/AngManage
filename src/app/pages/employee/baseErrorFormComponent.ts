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
    getControl(later: string) {
        return this.form.get(later);
    }

    hasError(later: string) {
        var e = this.getControl(later);
        return e && (e.dirty || e.touched) && e.invalid;
    }

    
}
