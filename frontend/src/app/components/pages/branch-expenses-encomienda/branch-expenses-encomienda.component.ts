import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'app-branch-expenses-encomienda',
    templateUrl: './branch-expenses-encomienda.component.html',
    styleUrls: ['./branch-expenses-encomienda.component.scss']
})
export class BranchExpensesEncomiendaComponent implements OnInit {

    constructor(private mainService: MainService) { }

    ngOnInit() {
        this.mainService.getPaymentExpenseByTypeCurrentMoth('branch_expense').subscribe(
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

    makechart(labels, series): void {
        const options = {
            chart: {
                width: '100%',
                height: 430,
                type: 'pie',
            },
            // labels: ['Agua', 'Luz', 'Alquiler', 'Telefono', 'Internet', 'Gasolina de vehiculos'],
            // series: [350, 500, 1000, 300, 200, 800],
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
            document.querySelector("#branch-expenses-simple-pie-chart"),
            options
        );
        chart.render();
    }


}
