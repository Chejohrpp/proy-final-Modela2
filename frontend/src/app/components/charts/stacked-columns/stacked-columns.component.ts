import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-stacked-columns',
  templateUrl: './stacked-columns.component.html',
  styleUrls: ['./stacked-columns.component.scss']
})
export class StackedColumnsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        const options = {
            chart: {
                height: 360,
                type: 'bar',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            series: [{
                name: 'PRODUCT A',
                data: [44, 55, 41, 67, 22, 43]
            },{
                name: 'PRODUCT B',
                data: [13, 23, 20, 8, 13, 27]
            },{
                name: 'PRODUCT C',
                data: [11, 17, 15, 15, 21, 14]
            },{
                name: 'PRODUCT D',
                data: [21, 7, 25, 13, 22, 8]
            }],
            xaxis: {
                type: 'datetime',
                categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            },
        }
        const chart = new ApexCharts(
            document.querySelector("#apex-stacked-columns"),
            options
        );
        chart.render();
    }

}
