import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router} from '@angular/router';

@Component({
    selector: 'contact-list',
    template: require('./contact-list.component.html')
})
export class ContactListComponent {
    private router: Router;
    public contacts: Contact[];

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
}

interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}
