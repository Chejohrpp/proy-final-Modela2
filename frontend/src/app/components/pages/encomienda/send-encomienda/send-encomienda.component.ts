import { Component, OnInit } from '@angular/core';
declare let L: any;
declare let QRious: any;

@Component({
  selector: 'app-send-encomienda',
  templateUrl: './send-encomienda.component.html',
  styleUrls: ['./send-encomienda.component.scss']
})
export class SendEncomiendaComponent implements OnInit {

  ngOnInit(): void {
    var map = L.map("map-container").setView([15.85, -90.384487], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    new QRious({
      element: document.querySelector("#codigo"),
      value: "1", // La URL o el texto
      size: 400,
      backgroundAlpha: 0, // 0 para fondo transparente
      foreground: "black", // Color del QR
      level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
    });
  }
}
