import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Utils } from './models/contact';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        ContactListComponent,
        ContactDetailComponent,
        ContactEditComponent,
        HomeComponent
    ],
    providers: [Utils],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'contact-list', component: ContactListComponent },
            { path: 'contact-detail/:id', component: ContactDetailComponent },
            { path: 'contact-edit/:id', component: ContactEditComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
