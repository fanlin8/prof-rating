import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-three',
  templateUrl: './page-three.component.html',
  styleUrls: ['./page-three.component.css']
})
export class PageThreeComponent implements OnInit {

  professors$: Observable<Professor[]>;

  constructor(private messageService: MessageService, private professorService: ProfessorService) { }

  ngOnInit() {
    this.professors$ = this.professorService.getProfessors();
  }

  private log(message: string) {
    this.messageService.add("PageThreeComponent: " + message);
  }

}
