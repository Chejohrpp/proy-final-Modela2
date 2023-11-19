import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/models/branch.model';
import { BranchService } from 'src/app/services/branch.service';
declare let L: any;
declare let QRious: any;

@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.scss']
})
export class NewBranchComponent implements OnInit {
  marker: any;
  map: any;
  address: null;
  name: null;
  branches = [];
  filterBranches = [];
  search = "";

  constructor(
    private branchService: BranchService,
    private toastService: ToastrService
    
    ) {
    this.getBranches();
  }

  getBranches() {
    this.branchService.getBranches().subscribe(
      (response: Branch[]) => {
        this.branches = response;
        this.filterBranches = this.branches;
        console.log(this.branches);

      }, (error) => {
        console.log(error);

      })
  }

  filterBranch() {
    this.filterBranches = this.branches.filter((element) =>
      element.name.toLowerCase().includes(this.search.toLowerCase()) || element.address.toLowerCase().includes(this.search.toLowerCase())
    );
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
    this.map.on('click', (e) => {
      var coord = e.latlng;
      var lat = coord.lat;
      var lng = coord.lng;
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = new L.marker(e.latlng).addTo(this.map);
    });
  }

  saveBranch() {
    const temp = {
      name: this.name,
      address: this.address,
      location: `${this.marker._latlng.lat},${this.marker._latlng.lng}`
    }
    this.branchService.addBranch(temp).subscribe(
      (response:any) => {
        this.toastService.success(response.message);
        this.getBranches();
      },
      (error) => {
        this.toastService.error('Error en el servidor, vuelve a intentarlo');
      })
  }

}
