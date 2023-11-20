import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-monthly-goals-encomienda',
  templateUrl: './monthly-goals-encomienda.component.html',
  styleUrls: ['./monthly-goals-encomienda.component.scss']
})
export class MonthlyGoalsEncomiendaComponent implements OnInit {
  currentbranchExpenses: any = null;
  currentbranchSpecial: any = null;
  currentsurplus: any = null;

  getNewShipmentsThisMonth: any = null;
  getEarningsThisMonth: any = null;
  getDeliveredShipmentsThisMonth: any = null;
  getTotalExtraHoursThisMonth: any = null;


  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11
    const currentYear = currentDate.getFullYear();

    this.mainService.totalBranchExpensesMonth().subscribe(
      (data: any[]) => {
        const currentMonthYearExpenses = data.find(
          (item) => item.month === currentMonth && item.year === currentYear
        );
        if (currentMonthYearExpenses) {
          this.currentbranchExpenses = this.formatNumber(parseFloat(currentMonthYearExpenses.total_operating_expenses));
        }
      },
      (error) => {
        console.error(error);
      }
    );

    this.mainService.totalSpecialsExpensesMonth().subscribe(
      (data: any[]) => {
        const currentMonthYearSpecials = data.find(
          (item) => item.month === currentMonth && item.year === currentYear
        );
        if (currentMonthYearSpecials) {
          this.currentbranchSpecial = this.formatNumber(parseFloat(currentMonthYearSpecials.total_special_expenses));
        }
      },
      (error) => {
        console.error(error);
      }
    );

    this.mainService.calculateBudgetVsExpenses().subscribe(
      (data: any) => {
        this.currentsurplus = this.formatNumber(data);
      }
    )

    this.mainService.getNewShipmentsThisMonth().subscribe(
      (data: any) => {
        this.getNewShipmentsThisMonth = this.formatNumber(data)
      }
    )

    this.mainService.getEarningsThisMonth().subscribe(
      (data: any) => {
        this.getEarningsThisMonth = this.formatNumber(data);
      },
      (error: any) => {
        console.error(error);
        // Manejar el error si es necesario
      }
    );

    this.mainService.getDeliveredShipmentsThisMonth().subscribe(
      (data: any) => {
        this.getDeliveredShipmentsThisMonth = this.formatNumber(data);
      },
      (error: any) => {
        console.error(error);
        // Manejar el error si es necesario
      }
    );

    this.mainService.getTotalExtraHoursThisMonth().subscribe(
      (data: any) => {
        this.getTotalExtraHoursThisMonth = this.formatNumber(data);
      },
      (error: any) => {
        console.error(error);
        // Manejar el error si es necesario
      }
    );

  }

  formatNumber(value: number): string {
    if (value === null || isNaN(value) || value === 0) {
      return '0';
    }
  
    const suffixes = ['', 'K', 'M']; // Escalas numéricas
    const sign = value < 0 ? '-' : ''; // Verifica si es negativo
    const absValue = Math.abs(value);
  
    const suffixNum = Math.floor(Math.log10(absValue) / 3); // Identifica la escala numérica
    const shortValue = (absValue / Math.pow(1000, suffixNum)).toFixed(1);
  
    return sign + shortValue + suffixes[suffixNum];
  }
  
}
