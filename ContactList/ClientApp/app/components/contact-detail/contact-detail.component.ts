import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'contact-detail',
    template: require('./contact-detail.component.html')
})
export class ContactDetailComponent implements OnInit {
    private http: Http;
    private route: ActivatedRoute;
    public contact: Contact;

    constructor(http: Http, route: ActivatedRoute) {
        this.http = http;
        this.route = route;
    }

    ngOnInit() {

        this.route.params
            .switchMap((params: Params) => this.http.get('/api/Contact/Detail/' + params['id']))
            .subscribe(result => { this.contact = result.json() });
    }
}

interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}
