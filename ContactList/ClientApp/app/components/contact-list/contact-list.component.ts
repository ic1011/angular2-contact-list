import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'contact-list',
    template: require('./contact-list.component.html')
})
export class ContactListComponent {
    public contacts: Contact[];

    constructor(http: Http) {
        http.get('/api/Contact/List').subscribe(result => {
            this.contacts = result.json();
        });
    }

    public loadDetail(contactId: number) {
        console.log(contactId);
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
