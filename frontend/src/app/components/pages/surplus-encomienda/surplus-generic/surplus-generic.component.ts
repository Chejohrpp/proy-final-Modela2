import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-surplus-generic',
  templateUrl: './surplus-generic.component.html',
  styleUrls: ['./surplus-generic.component.scss']
})
export class SurplusGenericComponent implements OnInit {

  constructor() {};

  ngOnInit() {
    const options = {
        chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -10
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 120
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function (val) {
                            return val + "%";
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91]
            },
        },
        stroke: {
            dashArray: 4
        },
        series: [67],
        labels: ['Median Ratio'],
    }
    const chart = new ApexCharts(
        document.querySelector("#excedente-generico-radialbar"),
        options
    );
    chart.render();
}
}
