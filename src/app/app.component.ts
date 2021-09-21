import { Component } from '@angular/core';
import { faBars, faChevronDown, faChevronRight,
  faTachometerAlt, faUserFriends, faEdit, faFileInvoice, faChartBar,
  faSearch, faEllipsisH, faCog, faBriefcase, faBell, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from './system.service';

const COMPANIES = new Array(6).fill(0).map((el) => {
  return {
    id: "1231231",
    dataEmissao: "02/02/2020",
    razaoSocial: "Ivan Oliveira Morais",
    cnpj: "24.486.058/0001-55",
    amount: 24000.45
  };
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'negocio-simples';
  menuOpen = true;

  faSearch = faSearch;
  faBars = faBars;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faEllipsisH = faEllipsisH;
  faTachometerAlt = faTachometerAlt;
  faUserFriends = faUserFriends;
  faEdit = faEdit;
  faFileInvoice = faFileInvoice;
  faChartBar = faChartBar;
  faCog = faCog;
  faBriefCase = faBriefcase;
  faBell = faBell;
  faCommentAlt = faCommentAlt;

  isCollapsed = true;
  companies = COMPANIES;

  constructor(public sys: SystemService) {
    
  }
}
