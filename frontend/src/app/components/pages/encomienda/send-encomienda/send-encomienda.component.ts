import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
declare let L: any;
declare let QRious: any;

@Component({
  selector: 'app-send-encomienda',
  templateUrl: './send-encomienda.component.html',
  styleUrls: ['./send-encomienda.component.scss']
})
export class SendEncomiendaComponent implements OnInit {
  listBranch = [];
  map: any;
  marker: null;
  branch: any;
  constructor(private branchService: BranchService) {
  }

  getListBranch() {
    this.branchService.getBranches().subscribe(
      (response) => {
        this.listBranch = Object(response)['list'];
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.branch = this.listBranch[0].id_branch;
        this.marker = new L.marker(
          { lat: this.listBranch[0].location.split(',')[0], lng: this.listBranch[0].location.split(',')[1] }
        ).addTo(this.map);
      }, (error) => {
        console.log(error);
      })
  }

  changeMarker(event:any){
    var temp = this.listBranch.filter((element)=>
      element.id_branch == parseInt(this.branch)
    );
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = new L.marker(
      { lat: temp[0].location.split(',')[0], lng: temp[0].location.split(',')[1] }
    ).addTo(this.map);
  }

  ngOnInit(): void {
    this.map = L.map("map-container").setView([15.85, -90.384487], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.map);
    new QRious({
      element: document.querySelector("#codigo"),
      value: "1", // La URL o el texto
      size: 400,
      backgroundAlpha: 0, // 0 para fondo transparente
      foreground: "black", // Color del QR
      level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
    });
    
    this.getListBranch();
  }
}
