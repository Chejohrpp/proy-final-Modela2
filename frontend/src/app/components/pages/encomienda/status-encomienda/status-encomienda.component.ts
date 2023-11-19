import { Component, OnInit } from '@angular/core';
declare let Html5QrcodeScanner: any;
declare let L: any;

@Component({
  selector: 'app-status-encomienda',
  templateUrl: './status-encomienda.component.html',
  styleUrls: ['./status-encomienda.component.scss']
})
export class StatusEncomiendaComponent implements OnInit {
  qrSearch = 0;
  code: any;
  map: any;
  ngOnInit(): void {
    if (this.map) {
      this.map = this.map.off();
      this.map = this.map.remove();
    }
    this.map = L.map("map-container").setView([15.85, -90.384487], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.map);
    L.Routing.control({
      waypoints: [
        L.latLng(15.85, -90), // Starting point
        L.latLng(15.90, -90.5) // Waypoint 1
      ], lineOptions: {
        styles: [
          { color: 'blue', opacity: 1, weight: 5 }, // Waypoint 1 to Waypoint 2
        ]
      },
      show: false
    }).addTo(this.map);
    L.Routing.control({
      waypoints: [
        L.latLng(15.90, -90.5), // Waypoint 1
        L.latLng(15.92, -90.8) // Waypoint 2
      ], lineOptions: {
        styles: [
          { color: 'white', opacity: 1, weight: 5 }, // Waypoint 1 to Waypoint 2
        ]
      },
      show: false
    }).addTo(this.map);
  }

  domReady(fn: any) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  changeSelect() {
    if (this.qrSearch == 1) {
      this.domReady(function () {
        var qr = document.getElementById("qr-result");
        function onScanSuccess(decodeText, decodeResult) {
          qr.innerHTML = "El código escaneado es el siguiente " + decodeText;
        }
        var htmlScanner = new Html5QrcodeScanner("qr", { fps: 10, qrbox: 250 });
        htmlScanner.render(onScanSuccess);
      })
    }
  }
}
