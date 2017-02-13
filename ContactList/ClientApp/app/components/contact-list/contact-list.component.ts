import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'contact-list',
    template: require('./contact-list.component.html')
})
export class ContactListComponent {
    private router: Router;
    private contacts: Contact[];
    private http: Http;

    constructor(http: Http, router: Router) {
        this.router = router;
        this.http = http;

        this.loadListContacts().subscribe(result => {
            this.contacts = result.json();
        });;
    }

    private loadListContacts() {
        return this.http.get('/api/Contact/List');
    }

    public loadDetailPage(contactId: number) {
        this.router.navigate(['/contact-detail', contactId]);
        console.log(contactId);
    }

    public loadEditPage(contactId: number) {
        this.router.navigate(['/contact-edit', contactId]);
    }

    public deleteContact(contactId: number) {
        this.http.delete('/api/Contact/Delete/' + contactId)
            .switchMap(result => this.loadListContacts())
            .subscribe(result => { this.contacts = result.json() });
    }
}
