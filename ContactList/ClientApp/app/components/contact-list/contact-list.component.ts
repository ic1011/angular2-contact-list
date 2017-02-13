import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact';

@Component({
    selector: 'contact-list',
    template: require('./contact-list.component.html')
})
export class ContactListComponent {
    private router: Router;
    private contacts: Contact[];

    constructor(http: Http, router: Router) {
        this.router = router;

        http.get('/api/Contact/List').subscribe(result => {
            this.contacts = result.json();
        });
    }

    public loadDetailPage(contactId: number) {
        this.router.navigate(['/contact-detail', contactId]);
        console.log(contactId);
    }

    public loadEditPage(contactId: number) {
        this.router.navigate(['/contact-edit', contactId]);
    }
}
