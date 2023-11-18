import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-special-expenses-encomienda',
  templateUrl: './special-expenses-encomienda.component.html',
  styleUrls: ['./special-expenses-encomienda.component.scss']
})
export class SpecialExpensesEncomiendaComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    const options = {
        chart: {
            width: '100%',
            height: 430,
            type: 'pie',
        },
        series: [2500, 1500, 440],
        labels: ["reparacion sucursal", "asesoria legal", "algo con los vehiculos (gas)"],
        theme: {
            monochrome: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }
    const chart = new ApexCharts(
        document.querySelector("#special-expenses-monochrome-pie-chart"),
        options
    );
    chart.render();
}

}
