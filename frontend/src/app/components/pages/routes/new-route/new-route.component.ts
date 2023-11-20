import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Branch, PointNear, PointNearRequest } from 'src/app/models/branch.model';
import { PointAssignment, RouteModel, RouteRequest } from 'src/app/models/route.model';
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
  points: PointNear[] = [];
  filterPoints: PointNear[] = [];
  filterPointsRoute: PointNear[] = [];
  newPointRequest: PointNearRequest = new PointNearRequest();
  markers = [];
  routingControls = [];
  branchOrigin = 0;
  routes = [];

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
    this.getRoutes();
  }

  getRoutes(){
    this.routeService.getRoutes().subscribe({
      next: (response:RouteModel[])=>{
        this.routes = response;
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }

  getBranches() {
    this.branchService.getBranches().subscribe({
      next: (response: Branch[]) => {
        this.branches = response;
        this.getConnections();
        this.branches.forEach((branch) => {
          var position = { lat: branch.location.split(',')[0], lng: branch.location.split(',')[1] };
          var marker = new L.marker(position).on('click', (e) => {
            this.markerOnClick(e, branch, marker);
          }).addTo(this.map);
          branch['marker'] = marker;
        })
        this.resetMap();
      }
    })
  }

  getConnections() {
    this.routeService.getPointsNear().subscribe({
      next: (response: PointNear[]) => {
        this.points = response;
        if (this.branchSelected) {
          this.filterPoints = this.points.filter((point) => {
            point['isOrigin'] = this.branchSelected.id_branch == point.origin;
            return this.branchSelected.id_branch == point.origin || this.branchSelected.id_branch == point.destiny
          });
        } else {
          this.filterPoints = this.points;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(error.error.error);
      }
    })
  }

  resetMap() {
    this.branches.forEach((branch) => {
      var marker = branch['marker'];
      marker.setIcon(this.createMarkerIcon(marker.options.icon, 'Default', '#ff5733'));
    })
    this.routingControls.forEach((rout) => {
      rout.remove();
    })
    this.filterPoints = this.points;
    this.branchesNear = [];
    this.branchSelected = null;
    this.routingControls = [];
  }

  generateColors(numColors: number): string[] {
    const colors: string[] = [];

    for (let i = 0; i < numColors; i++) {
      const hue = (360 / numColors) * i * 5;
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
        for (let i = 0; i < this.branchesNear.length; i++) {
          const element = this.branchesNear[i];
          if (element == branch) {
            this.toastService.error("Ya está esta conexión");
            return;
          }
        }
        marker.setIcon(this.createMarkerIcon(marker.options.icon, '2', '#ff5733'));
        var routingControl = L.Routing.control({
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
        this.routingControls.push(routingControl);
        routingControl.on('routeselected', (e) => {
          var route = e.route;
          var formattedDistance = route.summary.totalDistance / 1000; // Distancia total en kilómetros
          this.newPointNear.distance = Math.floor(formattedDistance);
          var duration = route.summary.totalTime; // Duración total en segundos
          this.newPointNear.time = Math.floor(duration / 3600);
          this.routeService.addPointsNear({ points: [this.newPointNear] }).subscribe({
            next: (response: any) => {
              this.toastService.success(response.message + "\nDistancia: " + this.newPointNear.distance + " Tiempo: " + this.newPointNear.time);
              this.newPointNear = new PointNear();
              this.getConnections();
            },
            error: (error: HttpErrorResponse) => {
              this.toastService.error(error.error.error);
            }
          });
        });
      }
    } else {
      this.branchSelected = branch;
      this.filterConnections();
      marker.setIcon(this.createMarkerIcon(marker.options.icon, '', '#ff5733'));
    }
  }

  filterConnections() {
    this.filterPoints = this.points.filter((point) => {
      point['isOrigin'] = this.branchSelected.id_branch == point.origin;
      return this.branchSelected.id_branch == point.origin || this.branchSelected.id_branch == point.destiny
    }
    );
    this.filterPoints.forEach((connection: PointNear) => {
      var findOut = this.branches.find((b) => {
        if (connection['isOrigin'])
          return b.id_branch === connection.destiny;
        else
          return b.id_branch === connection.origin;
      });
      if (findOut) {
        var routingControl = L.Routing.control({
          waypoints: [
            L.latLng(this.branchSelected.location.split(',')[0], this.branchSelected.location.split(',')[1]), // Starting point
            L.latLng(findOut.location.split(',')[0], findOut.location.split(',')[1]) // Waypoint 1
          ], lineOptions: {
            styles: [
              { color: this.colors[this.routingControls.length], opacity: 1, weight: 3 }, // Waypoint 1 to Waypoint 2
            ]
          },
          show: false,
          createMarker: function () {
            return null;
          }
        }).addTo(this.map);
        this.branchesNear.push(findOut);
        this.routingControls.push(routingControl);
      }
    })

  }

  sendRoute() {
    this.newPointNear.distance = this.newPointNear.distance ? this.newPointNear.distance : 0;
    this.newPointNear.time = this.newPointNear.time ? this.newPointNear.time : 0;
    this.newPointRequest.points.push(this.newPointNear);
    this.newPointNear = new PointNear();
  }

  addOrigin() {
    this.filterPointsRoute = this.points.filter((point) => {
      return point.origin == this.branchOrigin || point.destiny == this.branchOrigin
    });
    this.filterPointsRoute.forEach((point) => {
      var find = point.origin == this.branchOrigin ? point.destiny : point.origin;
      var branchFindOut = this.branches.find((branch) => {
        return branch.id_branch == find
      });
      point['name'] = branchFindOut.name;
      point['actual'] = this.branchOrigin;
      point['next'] = find;
    });
    this.nextBranch = this.filterPointsRoute[0].id_point_near;

  }
  nextBranch: any;
  idPoints = [];
  nameRoute = "";

  getBranchName(id_branch: number) {
    if (id_branch) {
      var branchFindOut = this.branches.find((branch) => {
        return branch.id_branch == id_branch
      });

      return branchFindOut.name;
    } else {
      return '';
    }
  }

  saveRoute(){
    if (this.nameRoute!=''){
      console.log(this.idPoints);
      var newRouteRequest = new RouteRequest();
      var count = 1;
      this.idPoints.forEach((point)=>{
        var tempPoint = new PointAssignment();
        tempPoint.id_point = point.id_point_near;
        tempPoint.sequence = count;
        count++;
        tempPoint.start_origin = point.isOrigin;
        newRouteRequest.pointAssignments.push(tempPoint);
      });
      console.log(this.nameRoute);
      var newRoute = new RouteModel();
      newRoute.steps = this.idPoints.length;
      newRoute.name = this.nameRoute;
      newRouteRequest.route = newRoute;
      this.routeService.saveRoute(newRouteRequest).subscribe({
        next:(response:any)=>{
          this.toastService.success(response.message);
          this.resetRoute();
        },
        error: (error:any)=>{
          this.toastService.error(error.error.error);
        }
      })
    } else {
      this.toastService.error("Ingresa el nombre de la ruta antes de guardarla");
    }
  }

  selectPoint() {
    var point = this.filterPointsRoute.find((point) => {
      return point.id_point_near == this.nextBranch;
    })
    point['isOrigin'] = (point.origin == point['actual']);
    this.idPoints.unshift(point);
    this.filterPointsRoute = this.points.filter((p) => {
      return (p.origin == point['next'] || p.destiny == point['next']) && p.id_point_near != point.id_point_near;
    });
    this.filterPointsRoute.forEach((p) => {
      if (p.origin == point['next']) {
        p['name'] = this.getBranchName(p.destiny);
        p['actual'] = p.origin;
        p['next'] = p.destiny;
      } else {
        p['name'] = this.getBranchName(p.origin);
        p['actual'] = p.destiny;
        p['next'] = p.origin;
      }
    });
    if (this.filterPointsRoute.length != 0)
      this.nextBranch = this.filterPointsRoute[0].id_point_near;
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

  resetRoute(){
    this.branchOrigin = 0;
    this.idPoints = [];
    this.nameRoute = "";
    this.getRoutes();
  }
}
