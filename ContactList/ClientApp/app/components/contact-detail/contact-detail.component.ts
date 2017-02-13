import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Contact, Utils } from '../../models/contact';

@Component({
    selector: 'contact-detail',
    template: require('./contact-detail.component.html')
})
export class ContactDetailComponent implements OnInit {
    private http: Http;
    private route: ActivatedRoute;
    private utils: Utils;
    private contact: Contact;

    constructor(http: Http, route: ActivatedRoute, utils: Utils) {
        this.http = http;
        this.route = route;
        this.utils = utils;
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.http.get('/api/Contact/Detail/' + params['id']))
            .subscribe(result => { this.contact = result.json(); console.log(this.contact);});
    }
}
