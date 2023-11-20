import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-surplus-generic',
  templateUrl: './surplus-generic.component.html',
  styleUrls: ['./surplus-generic.component.scss']
})
export class SurplusGenericComponent implements OnInit {
    total_surplus:any = 0;
    constructor(private mainService: MainService) { }

    ngOnInit() {
        this.mainService.getPaymentExpenseByTypeCurrentMoth('surplus').subscribe(
            (data: any[]) => {
                // Obtener la lista de descripciones (labels)
                const labels = data.map(item => item.description);
                // Obtener la lista de montos (amounts)
                const series = data.map(item => parseFloat(item.amount)); // Convertir a número si es necesario
                // Sumar todos los valores del arreglo "series" usando reduce
                // Sumar todos los valores del arreglo "series" usando reduce y luego formatear a 2 decimales
                this.total_surplus = +series.reduce((acc, curr) => acc + curr, 0).toFixed(2);
                this.makechart(labels, series);
            },
            error => {
                console.error(error);
            }
        );
    }

    makechart(labels, series): void {
        const options = {
            chart: {
                width: '100%',
                height: 430,
                type: 'pie',
            },
            labels: labels,
            series: series,
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
            document.querySelector("#excedente-generico"),
            options
        );
        chart.render();
    }

}
