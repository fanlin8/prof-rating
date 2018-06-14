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

  backgroundColor: string = "white";
  spinnerValue: number = 100;

  constructor() { }

  ngOnInit() {
    // this.backgroundColor = "rgba(" + this.getColor() + ", 0.25)";
    // let rating = this.professor.rating;
    // if (rating) {
    //   this.spinnerValue = (rating / 5) * 100
    // }
  }

  // getSpinnerClass():string {
    // let rating = this.professor.rating;
    // switch (true) {
    //   case rating <= 1:
    //     return "rating-1";
    //   case rating <= 2:
    //     return "rating-2";
    //   case rating <= 3:
    //     return "rating-3";
    //   case rating <= 4:
    //     return "rating-4";
    //   case rating <= 5:
    //     return "rating-5";

  //     default:
  //       return "";
  //   }
  // }

  // getColor(): string {
  //   let rating = this.professor.rating;
  //   switch (true) {
  //     case rating <= 1:
  //       return "255, 51, 51";
  //     case rating <= 2:
  //       return "255, 153, 51";
  //     case rating <= 3:
  //       return "255, 204, 51";
  //     case rating <= 4:
  //       return "255, 255, 51";
  //     case rating <= 5:
  //       return "51, 255, 51";

  //     default:
  //       return "255, 255, 255";
  //   }
  // }

  // getProfessorName(): string {
  //   let fullname = this.professor.firstName;
  //   if (this.professor.middleName) {
  //     fullname += " " + this.professor.middleName;
  //   }
  //   return fullname + " " + this.professor.lastName;
  // }

}
