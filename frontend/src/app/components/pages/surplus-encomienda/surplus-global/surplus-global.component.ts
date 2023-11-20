import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-surplus-global',
  templateUrl: './surplus-global.component.html',
  styleUrls: ['./surplus-global.component.scss']
})
export class SurplusGlobalComponent implements OnInit {
  currentbudget: number = 0;
  currentsurplus: number = 0;

  constructor(
    private mainService: MainService,
    private budgetService: BudgetService
  ) {};

  ngOnInit() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11
    const currentYear = currentDate.getFullYear();

    this.mainService.calculateBudgetVsExpenses().subscribe(
      (data: any) => {
        this.currentsurplus = Number(data)
        this.budgetService.getBudgetByMonthYear(`${currentMonth}-${currentYear}`).subscribe(
          (data: any) => {
            this.currentbudget = Number(data[0].amount)
            const percent = ((this.currentsurplus / this.currentbudget) * 100).toFixed(2);
            this.makeChart(parseFloat(percent));
          }
        )
      }
    )    
  }

  makeChart(percent:any) {
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
      series: [percent],
      labels: ['Average Results'],
    }
    const chart = new ApexCharts(
      document.querySelector("#excedente-total-radialbar"),
      options
    );
    chart.render();

  }
}
