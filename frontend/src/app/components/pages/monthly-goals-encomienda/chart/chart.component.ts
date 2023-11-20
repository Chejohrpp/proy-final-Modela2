import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-chart-monthly-goals',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  budgets: any[] = [];

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.getAllBudgets().subscribe(
      (data: any) => {
        this.budgets = this.sortBudgetsByDate(data); // Ordenar los presupuestos por fecha
        this.makeChart(); // Llamar a la función para generar la gráfica
      },
      err => {
        console.error(err);
      }
    );
  }

  sortBudgetsByDate(budgets: any[]): any[] {
    // Ordenar los presupuestos por fecha (month_year)
    return budgets.sort((a, b) => {
      const [monthA, yearA] = a.month_year.split('-').map(Number);
      const [monthB, yearB] = b.month_year.split('-').map(Number);
      
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });
  }

  makeChart() {
    const categories = this.budgets.map(budget => budget.month_year); // Obtener las categorías (month_year)
    const data = this.budgets.map(budget => parseFloat(budget.amount)); // Obtener los datos (amount) como números
    
    const options = {
      chart: {
        height: 335,
        type: 'area',
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#008FFB', '#18D2B7'],
      stroke: {
        curve: 'smooth'
      },
      series: [{
        name: 'Presupuestos',
        data: data // Usar los datos de los presupuestos
      }],
      xaxis: {
        categories: categories, // Usar las categorías de month_year
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      }
    };

    const chart = new ApexCharts(
      document.querySelector("#revenue-summary-chart"),
      options
    );
    chart.render();
  }
}
