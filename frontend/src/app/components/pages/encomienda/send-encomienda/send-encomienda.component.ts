import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dijkstra } from 'src/app/common/dijkstra';
import { Grafo } from 'src/app/common/dijkstra2';
import { Branch, PointNear } from 'src/app/models/branch.model';
import { Param } from 'src/app/models/param.model';
import { AuthService } from 'src/app/services/auth.service';
import { BranchService } from 'src/app/services/branch.service';
import { ParamService } from 'src/app/services/param.service';
import { RouterService } from 'src/app/services/router.service';
import * as g from 'node-dijkstra';
import { Shipment } from 'src/app/models/shipment.model';
import { ShipmentService } from 'src/app/services/shipment.service';
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
  branchUser: any;
  user: any;
  encomienda = {
    weight: 0,
    x: 0,
    y: 0,
    z: 0,
    client: "",
    receiver: "",
    priority: 0
  }
  routePoint: PointNear[] = [];
  approximate = {
    time: 0,
    distance: 0,
    cost: 0
  }

  constructor(
    private branchService: BranchService,
    private authService: AuthService,
    private paramService: ParamService,
    private toastService: ToastrService,
    private routeService: RouterService,
    private shipmentService: ShipmentService
  ) {
  }
  routeBranches = [];

  calculate() {
    this.paramService.getParams().subscribe({
      next: (response: Param[]) => {
        var params = response;
        var gasoline = params[0];
        var storage = params[2];
        var resources = params[3];
        var price1 = params[8];
        var price2 = params[9];
        var price3 = params[10];
        var weight1 = params[5];
        var weight2 = params[6];
        var weight3 = params[7];
        var basePrice = 0;
        var pointRoutes: PointNear[] = [];
        this.routePoint = [];
        if (this.encomienda.weight != 0) {
          if (this.encomienda.weight < weight1.factor) {
            basePrice = price1.factor;
          } else if (this.encomienda.weight >= weight1.factor && this.encomienda.weight < weight2.factor) {
            basePrice = price2.factor;
          } else {
            basePrice = price3.factor;
          }
          this.routeService.getPointsNear().subscribe({
            next: (response: PointNear[]) => {
              pointRoutes = response;
              const graph = new Map();
              for (let i = 0; i < this.listBranch.length; i++) {
                const b = this.listBranch[i];
                const a = new Map();
                for (let j = 0; j < pointRoutes.length; j++) {
                  const point = pointRoutes[j];
                  if (point.origin == b.id_branch || point.destiny == b.id_branch) {
                    if (point.origin == b.id_branch) {
                      if (this.encomienda.priority == 0) {
                        a.set(point.destiny, point.time);
                      } else {
                        a.set(point.destiny, point.distance);
                      }
                    } else {
                      if (this.encomienda.priority == 0) {
                        a.set(point.origin, point.time);
                      } else {
                        a.set(point.origin, point.distance);
                      }
                    }
                  }
                }
                graph.set(b.id_branch, a);
              }
              const route = new g(graph)
              this.routeBranches = route.path(this.branchUser.id_branch, parseInt(this.branch));
              var timeTotal = 0;
              var distanceTotal = 0;
              for (let i = 0; i < this.routeBranches.length - 1; i++) {
                const branch1 = this.routeBranches[i];
                const branch2 = this.routeBranches[i + 1];
                for (let j = 0; j < pointRoutes.length; j++) {
                  const point = pointRoutes[j];
                  if ((point.origin == branch1 && point.destiny == branch2) || (point.origin == branch2 && point.destiny == branch1)) {
                    this.routePoint.unshift(point);
                    point['name'] = this.getBranchName(branch2);
                    timeTotal += point.time;
                    distanceTotal += point.distance;
                    break;
                  }
                }
              }
              var cost_gasoline = gasoline.factor * distanceTotal;
              var cost_storage = storage.factor * timeTotal;

              basePrice += cost_gasoline + cost_storage;
              basePrice += basePrice * resources.factor;
              console.log(this.routePoint, timeTotal, distanceTotal, 'Costo total' + basePrice);
              this.approximate.cost = basePrice;
              this.approximate.time = timeTotal;
              this.approximate.distance = distanceTotal;
              this.drawRoutes();
            },
            error: (error: any) => {
              this.toastService.error(error.error.error);
            }
          })
        } else {
          this.toastService.error("Ingresa un peso correcto");
        }
      },
      error: (error: any) => {
        this.toastService.error("Problema al obtener los parametros de la base de datos");
      }
    })
  }

  routingControls = [];

  drawRoutes() {
    this.routingControls.forEach((r)=>{
      r.remove()
    });
    this.routingControls = [];
    var tempList = this.getBranchList();
    var waypoints = [];
    tempList.forEach((temp) => {
      console.log(temp.location);
      waypoints.push(L.latLng(temp.location.split(',')[0], temp.location.split(',')[1]))
    })
    console.log();
    var customMarkerIcon = L.icon({
      iconUrl: '../../../../../assets/img/marker.png',
      iconSize: [32, 32], // Tamaño del icono [ancho, alto]
      iconAnchor: [16, 32], // Punto de anclaje del icono (centro inferior)
      popupAnchor: [0, -32] // Punto de anclaje del popup (arriba del icono)
    });
    
    // Crear un objeto de opciones para el marcador
    var markerOptions = {
      draggable: true, // Si se permite arrastrar el marcador
      icon: customMarkerIcon // Utilizar el icono personalizado
    };
    var routingControl = L.Routing.control({
      waypoints: waypoints,
      lineOptions: {
        styles: [
          { color: "yellow", opacity: 1, weight: 3 }, // Waypoint 1 to Waypoint 2
        ]
      },
      show: false,
      createMarker: function (i, waypoint, n) {
        var marker = L.marker(waypoint.latLng, markerOptions);
        return marker;
      },
    }).addTo(this.map);
    this.routingControls.push(routingControl);
  }


  getBranchList() {
    var routeBranchesOrder = [];
    for (let i = 0; i < this.routeBranches.length; i++) {
      const o = this.routeBranches[i];
      for (let j = 0; j < this.listBranch.length; j++) {
        const b = this.listBranch[j];
        if (b.id_branch == o) {
          routeBranchesOrder.unshift(b);
          break;
        }
      }
    }
    return routeBranchesOrder;
  }

  getListBranch() {
    this.user = this.authService.getEmployeeUser();
    this.branchUser = new Branch();
    this.branchUser.id_branch = this.user.id_branch;

    this.branchService.getBranches().subscribe(
      (response: Branch[]) => {
        this.listBranch = response;
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

  changeMarker(event: any) {
    var temp = this.listBranch.filter((element) =>
      element.id_branch == parseInt(this.branch)
    );
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = new L.marker(
      { lat: temp[0].location.split(',')[0], lng: temp[0].location.split(',')[1] }
    ).addTo(this.map);
  }

  getBranchName(id_branch: number) {
    if (id_branch) {
      var branchFindOut = this.listBranch.find((branch) => {
        return branch.id_branch == id_branch
      });

      return branchFindOut.name;
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    this.map = L.map("map-container").setView([15.85, -90.384487], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.map);
    this.getListBranch();
  }
  qr = 0;
  saveShipment(){
    var shipmentRequest = new Shipment();
    shipmentRequest.origin = this.branchUser.id_branch;
    shipmentRequest.destiny = this.branch;
    shipmentRequest.max_time = this.approximate.time;
    shipmentRequest.weight = this.encomienda.weight;
    shipmentRequest.payment = this.approximate.cost;
    shipmentRequest.volume = this.encomienda.x * this.encomienda.y * this.encomienda.z;
    this.shipmentService.addShipment(shipmentRequest).subscribe({
      next: (response:any)=>{
        this.toastService.success(response.message);
        console.log(response);
        this.qr = response.id;
        new QRious({
          element: document.querySelector("#codigo"),
          value: this.qr+"", // La URL o el texto
          size: 400,
          backgroundAlpha: 0, // 0 para fondo transparente
          foreground: "black", // Color del QR
          level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
        });
      },
      error: (error:any)=>{
        this.toastService.error("Error al ingresar la encomienda, intenta de nuevo");
      }
    })
    
  }
}
