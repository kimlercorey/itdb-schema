import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../data/api.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  isOpen = {};
  public tickets;

  constructor(private _api: ApiService) { }

  public ngOnInit() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this._api.loadData('./assets/data/egovjira.json').subscribe((results) => {
      let json = results;
      for (var i = 0; i < json.length; i++) {
        const created = new Date(json[i]['Created']);
        json[i]['Created'] = monthNames[created.getMonth()] + ' ' + created.getDate() + ', ' + created.getFullYear();

        const updated = new Date(json[i]['Updated']);
        json[i]['Updated'] = monthNames[updated.getMonth()] + ' ' + updated.getDate() + ', ' + updated.getFullYear();

        let description = json[i]['Description'];
        description = description.replace(/\uFFFD/g, '');
        description = description.replace(/\{panel\}/g, '');
        json[i]['Description'] = description;
      }
      this.tickets = json;
    });
  }

}