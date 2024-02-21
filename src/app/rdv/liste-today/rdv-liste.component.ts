import { Component, OnInit } from '@angular/core';
import { RDVService } from '../../services/rdv.service';

@Component({
  selector: 'app-rdv-liste-component',
  templateUrl: './rdv-liste.component.html',
  styleUrls: ['./rdv-liste.component.css']
})
export class RDVlisteComponent implements OnInit {
  rendezVous: any;

  constructor(private rdvService: RDVService) { }

  ngOnInit(): void {
    this.rdvService.getRendezVous().subscribe(data => {
    this.rendezVous = data;
    });
  }
}