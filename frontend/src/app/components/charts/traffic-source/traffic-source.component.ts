import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-traffic-source',
  templateUrl: './traffic-source.component.html',
  styleUrls: ['./traffic-source.component.scss']
})
export class TrafficSourceComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        const options = {
            chart: {
                height: 320,
                type: 'line',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [5, 7, 5],
                curve: 'straight',
                dashArray: [0, 8, 5]
            },
            colors: ['#ea3a3b', '#13bb37', '#4788ff'],
            series: [
            {
                name: "Session Duration",
                data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10, 97]
            },
            {
                name: "Page Views",
                data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35, 85]
            },
            {
                name: 'Total Visits',
                data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47, 99]
            }
            ],
            legend: {
                show: false,
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '13 Jan', '12 Jan'],
            },
            tooltip: {
                y: [{
                    title: {
                        formatter: function (val: any) {
                            return val + " (mins)"
                        }
                    }
                }, {
                title: {
                    formatter: function (val: any) {
                        return val + " per session"
                    }
                }
                }, {
                title: {
                        formatter: function (val: any) {
                            return val;
                        }
                    }
                }]
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        }
        const chart = new ApexCharts(
            document.querySelector("#traffic-source-chart"),
            options
        );
        chart.render();
    }

}