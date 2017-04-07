import { Component } from "@angular/core";
import { RailwayReceiptService } from './../../services/railwayReceipt';

@Component({
    selector: "my-app",
    templateUrl: '/app/rootModule/templates/rr-list.html'
})

export class RRListComponent {
    rrList: any;
    constructor(private railwayReceiptService: RailwayReceiptService) {

    }
    ngOnInit(): void {
        this.railwayReceiptService.getRRList().then(res => this.rrList = res.result)
    }
}