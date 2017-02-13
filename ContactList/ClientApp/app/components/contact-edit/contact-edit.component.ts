import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Contact, Utils } from '../../models/contact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'contact-edit',
    template: require('./contact-edit.component.html')
})
export class ContactEditComponent implements OnInit {
    private http: Http;
    private route: ActivatedRoute;
    private utils: Utils;
    private fb: FormBuilder;
    private contactForm: FormGroup;
    private contact: Contact;
    private submitting: boolean;

    private formErrors = {
        'firstName': '',
        'lastName': '',
        'email': '',
        'phone': '',
    };

    private validationMessages = {
        'firstName': {
            'required': 'First Name is required.',
            'minlength': 'First Name must be at least 2 characters long.'
        },
        'lastName': {
            'required': 'Last Name is required.',
            'minlength': 'Last Name must be at least 2 characters long.'
        },
        'email': {
            'required': 'Email is required.',
            'pattern': 'Please enter valid email address.'
        },
        'phone': {
            'required': 'Phone is required.',
            'pattern': 'The phone number must be at least 10 characters long and can contain only digits and dashes.'
        },
    };

    constructor(http: Http,
        route: ActivatedRoute,
        utils: Utils,
        fb: FormBuilder) {
        this.http = http;
        this.route = route;
        this.utils = utils;
        this.fb = fb;
        this.submitting = false;
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.http.get('/api/Contact/Detail/' + params['id']))
            .subscribe(result => {
                this.contact = result.json();
                this.buildForm();
            });
    }

    buildForm() {
        this.contactForm = this.fb.group({
            'firstName': [this.contact.firstName, [
                Validators.required,
                Validators.minLength(2)
            ]],
            'lastName': [this.contact.lastName, [
                Validators.required,
                Validators.minLength(2)
            ]],
            'email': [this.contact.email, [
                Validators.required,
                Validators.pattern('[a-z0-9_.]{1,}@[a-z0-9-]{1,}\.[a-z]{2,}')
            ]],
            'phone': [this.contact.phone, [
                Validators.required,
                Validators.pattern('^[0-9-]{10,}$')
            ]],
            'address': [this.contact.address],
            'gender': [this.contact.gender]
        });

        this.contactForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.contactForm) { return; }
        const form = this.contactForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onSubmit() {
        this.submitting = true;

        let contactId = this.contact.id;
        this.contact = this.contactForm.value;
        this.contact.id = contactId;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.put('/api/Contact/Edit', JSON.stringify(this.contact), options)
            .subscribe(r => {
                this.submitting = false;

                let json = r.json();

                if (json.status != 'success') {
                    console.log('Error: ' + json.message);
                }
            });
    }
}
