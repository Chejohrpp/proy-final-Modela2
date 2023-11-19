import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Branch, PointNear, PointNearRequest } from 'src/app/models/branch.model';
import { BranchService } from 'src/app/services/branch.service';
import { RouterService } from 'src/app/services/router.service';
declare let L: any;
@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.scss']
})
export class NewRouteComponent implements OnInit {
  map: any;
  branches: Branch[] = [];
  branchSelected: Branch;
  branchesNear: Branch[] = [];
  colors: string[] = [];
  show = {
    route: {
      showForm: false
    }
  }
  newPointNear: PointNear = new PointNear();
  newPointRequest: PointNearRequest = new PointNearRequest();

  constructor(
    private branchService: BranchService,
    private routeService: RouterService,
    private toastService: ToastrService
  ) {

  }

  ngOnInit(): void {
    if (this.map != undefined) { this.map.remove(); }
    this.map = L.map("map-container").setView([15.85, -90.384487], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.map);

    this.colors = this.generateColors(50);
    this.getBranches();
  }

  getBranches() {
    this.branchService.getBranches().subscribe({
      next: (response: Branch[]) => {
        this.branches = response;
        this.branches.forEach((branch) => {
          var position = { lat: branch.location.split(',')[0], lng: branch.location.split(',')[1] };
          var marker = new L.marker(position).on('click', (e) => {
            this.markerOnClick(e, branch, marker);
          }).addTo(this.map);
        })
      }
    })
  }

  generateColors(numColors: number): string[] {
    const colors: string[] = [];

    for (let i = 0; i < numColors; i++) {
      const hue = (360 / numColors) * i * 3;
      const saturation = 70; // Puedes ajustar la saturación según tus preferencias
      const luminosity = 60; // Puedes ajustar la luminosidad según tus preferencias

      const color = `hsl(${hue}, ${saturation}%, ${luminosity}%)`;
      colors.push(color);
    }

    return colors;
  }

  markerOnClick(event: any, branch: Branch, marker: any) {
    this.newPointNear = new PointNear();
    if (this.branchSelected) {
      if (branch != this.branchSelected) {
        marker.setIcon(this.createMarkerIcon(marker.options.icon, '2', '#ff5733'));
        for (let i = 0; i < this.branchesNear.length; i++) {
          const element = this.branchesNear[i];
          if (element == branch) {
            return;
          }
        }
        L.Routing.control({
          waypoints: [
            L.latLng(this.branchSelected.location.split(',')[0], this.branchSelected.location.split(',')[1]), // Starting point
            L.latLng(branch.location.split(',')[0], branch.location.split(',')[1]) // Waypoint 1
          ], lineOptions: {
            styles: [
              { color: this.colors[this.branchesNear.length], opacity: 1, weight: 3 }, // Waypoint 1 to Waypoint 2
            ]
          },
          show: false,
          createMarker: function () {
            // Return null to prevent the default marker from being created
            return null;
          }
        }).addTo(this.map);
        const labelsControl = L.control({ position: 'topright' });
        labelsControl.onAdd = () => {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          const startLabel = L.DomUtil.create('div', 'label');
          startLabel.textContent = this.branchSelected.name + ' => ' + branch.name;
          container.appendChild(startLabel);

          return container;
        };
        this.branchesNear.push(branch);
        labelsControl.addTo(this.map);
        this.newPointNear.origin = this.branchSelected.id_branch;
        this.newPointNear.destiny = branch.id_branch;
        this.show.route.showForm = true;
      }
    } else {
      this.branchSelected = branch;
      marker.setIcon(this.createMarkerIcon(marker.options.icon, '', '#ff5733'));
    }
  }

  sendRoute() {
    this.newPointNear.distance = this.newPointNear.distance ? this.newPointNear.distance : 0;
    this.newPointNear.time = this.newPointNear.time ? this.newPointNear.time : 0;
    this.newPointRequest.points.push(this.newPointNear);
    this.newPointNear = new PointNear();
    this.show.route.showForm = false;
  }

  sendPoints() {
    if (this.newPointRequest.points.length > 0) {
      this.routeService.addPointsNear(this.newPointRequest).subscribe({
        next: (response:any)=>{
          this.toastService.success(response.message);
        },
        error: (error:any) => {
          this.toastService.error("Error en el servidor");
        }
      });
    }
  }

  createMarkerIcon(icon: any, version: string, color: string): any {
    return L.icon({
      iconUrl: '../../../../../assets/img/marker' + version + '.png',
      iconSize: icon.options.iconSize,
      iconAnchor: icon.options.iconAnchor,
      popupAnchor: icon.options.popupAnchor,
      iconColor: color
    });
  }
}
