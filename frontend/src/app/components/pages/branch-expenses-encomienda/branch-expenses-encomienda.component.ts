import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-expenses-encomienda',
  templateUrl: './branch-expenses-encomienda.component.html',
  styleUrls: ['./branch-expenses-encomienda.component.scss']
})
export class BranchExpensesEncomiendaComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    const options = {
        chart: {
            width: '100%',
            height: 430,
            type: 'pie',
        },
        labels: ['Agua', 'Luz', 'Alquiler', 'Telefono', 'Internet', 'Gasolina de vehiculos'],
        series: [350, 500, 1000, 300, 200,800],
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
        }],
        legend: {
            horizontalAlign: 'right',
        }
    }
    const chart = new ApexCharts(
        document.querySelector("#branch-expenses-simple-pie-chart"),
        options
    );
    chart.render();
}


}
