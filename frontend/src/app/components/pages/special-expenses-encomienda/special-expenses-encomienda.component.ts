import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-special-expenses-encomienda',
  templateUrl: './special-expenses-encomienda.component.html',
  styleUrls: ['./special-expenses-encomienda.component.scss']
})
export class SpecialExpensesEncomiendaComponent implements OnInit {

    constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getPaymentExpenseByTypeCurrentMoth('special_expense').subscribe(
        (data: any[]) => {
            // Obtener la lista de descripciones (labels)
            const labels = data.map(item => item.description);
            // Obtener la lista de montos (amounts)
            const series = data.map(item => parseFloat(item.amount)); // Convertir a número si es necesario
            this.makechart(labels, series);
        },
        error => {
            console.error(error);
        }
    );
}

    makechart(labels,series):void {
        const options = {
            chart: {
                width: '100%',
                height: 430,
                type: 'pie',
            },
            // series: [2500, 1500, 440],
            // labels: ["reparacion sucursal", "asesoria legal", "algo con los vehiculos (gas)"],
            series,
            labels,
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
