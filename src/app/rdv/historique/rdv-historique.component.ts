import { Component, OnInit } from '@angular/core';
import { RDVService } from '../../services/rdv.service';
import { AuthentificationService } from '../../authentification.service';

@Component({
  selector: 'app-rdv-historique-component',
  templateUrl: './rdv-historique.component.html',
  styleUrls: ['./rdv-historique.component.css']
})
export class RDVhistoriqueComponent implements OnInit {
  rendezVous: any;

  constructor(private rdvService: RDVService) { }

  ngOnInit(): void {
    this.rdvService.getHistorique().subscribe(data => {
    this.rendezVous = data;
    });
  }
}
