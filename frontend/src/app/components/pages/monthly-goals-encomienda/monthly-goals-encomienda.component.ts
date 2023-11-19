import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-monthly-goals-encomienda',
  templateUrl: './monthly-goals-encomienda.component.html',
  styleUrls: ['./monthly-goals-encomienda.component.scss']
})
export class MonthlyGoalsEncomiendaComponent implements OnInit {
  currentbranchExpenses: number = 0;
  currentbranchSpecial: number = 0;

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
          this.currentbranchExpenses = parseFloat(currentMonthYearExpenses.total_operating_expenses);
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
          this.currentbranchSpecial = parseFloat(currentMonthYearSpecials.total_special_expenses);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
