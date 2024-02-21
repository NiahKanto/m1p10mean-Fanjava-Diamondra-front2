import { Component, OnInit } from '@angular/core';
import { serviceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-service-fiche-component',
  templateUrl: './service.fiche.component.html',
  styleUrls: ['./service.fiche.component.css']
})
export class ServiceFicheComponent implements OnInit {
  services: any;

  constructor(private route: ActivatedRoute,private servv: serviceService) { }

  ngOnInit(): void {
    // Récupérer l'ID depuis les paramètres de la route
    this.route.params.subscribe(params => {
      const id = params['id']; // Obtenez l'ID depuis les paramètres de la route
      console.log("id="+id)
      this.servv.getfiche(id).subscribe(data => {
        this.services = data;
      });
    });
  }
}