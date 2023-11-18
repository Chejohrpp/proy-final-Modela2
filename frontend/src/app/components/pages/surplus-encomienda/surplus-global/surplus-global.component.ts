import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-surplus-global',
  templateUrl: './surplus-global.component.html',
  styleUrls: ['./surplus-global.component.scss']
})
export class SurplusGlobalComponent implements OnInit {

  constructor() {};

  ngOnInit() {
    const options = {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        height: 600,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            shadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: '22px'
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        },
      },
      series: [50],
      labels: ['Average Results'],
    }
    const chart = new ApexCharts(
      document.querySelector("#excedente-total-radialbar"),
      options
    );
    chart.render();
  }
}
