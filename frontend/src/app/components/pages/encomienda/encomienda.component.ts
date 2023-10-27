import { Component, OnInit } from '@angular/core';
declare let L: any;

@Component({
  selector: 'app-encomienda',
  templateUrl: './encomienda.component.html',
  styleUrls: ['./encomienda.component.scss']
})
export class EncomiendaComponent implements OnInit{

  ngOnInit(): void {
      var map = L.map("map-container").setView([15.85, -90.384487], 7);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    }

}
