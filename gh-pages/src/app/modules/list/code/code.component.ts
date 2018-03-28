import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  schemaCats: any[];
  businessCase;
  content = {};
  urlRoot = 'https://rawgit.com/scottmccaughey/ITDB-schema/master/gh-pages/src/assets/content/schema-';

  constructor(private http: Http) {}

  getSchema(schemaCat) {
    return this.http.get(this.urlRoot + schemaCat + '.md').subscribe(data => {
      this.content[schemaCat] = data.text();
    });
  }

  ngOnInit() {
    this.schemaCats = ['BusinessCase', 'CIORating', 'ITBudget', 'InvestmentReport'];
    for (var schemaCat of this.schemaCats) {
      this.getSchema(schemaCat);
    }
  }

}