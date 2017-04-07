import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http'


import { AppComponent } from './components/app.component';
import { RouterModule, Route } from "@angular/router"
import { RRListComponent } from './components/rrlist.component';

import { RailwayReceiptService } from './../services/railwayReceipt';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot([
            { path: 'rr-list', component: RRListComponent }
        ])
    ],
    declarations: [AppComponent, RRListComponent],
    bootstrap: [AppComponent],
    providers: [RailwayReceiptService]
})

export class AppModule { }