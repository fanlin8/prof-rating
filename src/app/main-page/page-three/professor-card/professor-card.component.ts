import { Component, OnInit, Input } from '@angular/core';
import { Professor } from '../../../models/professor';

@Component({
  selector: 'app-professor-card',
  templateUrl: './professor-card.component.html',
  styleUrls: ['./professor-card.component.css']
})
export class ProfessorCardComponent implements OnInit {

  @Input()
  professor: Professor;

  panelOpened: boolean = false;
  filterInput: string;

  constructor() { }

  ngOnInit() {
  }

  getProfessorName(): string {
    let fullname = this.professor.firstName;
    if (this.professor.middleName) {
      fullname += " " + this.professor.middleName;
    }
    return fullname + " " + this.professor.lastName;
  }

}
