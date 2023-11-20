import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budgets: any[] = [];
  selectedBudget: any = null;
  showInsertForm: boolean = false;
  newBudget: any = {
    month_year: '',
    amount: 0
  };

  constructor(private budgetService: BudgetService, private toastService: ToastrService) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getAllBudgets().subscribe(
      (response: any) => {
        this.budgets = response;
      },
      (error) => {
        console.error(error);
        this.toastService.error('Error al cargar los presupuestos', 'Error');
      }
    );
  }

  selectBudget(month_year: string): void {
    this.selectedBudget = this.budgets.find((budget) => budget.month_year === month_year);
  }

  submitForm(): void {
    if (this.selectedBudget) {
      this.budgetService.updateBudgetAmount(this.selectedBudget.month_year, this.selectedBudget.amount)
        .subscribe(
          () => {
            this.toastService.success('Presupuesto actualizado correctamente', 'Éxito');
            this.selectedBudget = null;
            this.loadBudgets();
          },
          (error) => {
            console.error(error);
            this.toastService.error('Error al actualizar el presupuesto', 'Error');
          }
        );
        this.showInsertForm = false;
    }
  }
  

  toggleInsertForm(): void {
    this.showInsertForm = !this.showInsertForm;
  }

  insertBudget(): void {
    if (this.newBudget.month_year == '' || this.newBudget.amount === 0) {
      this.toastService.error('Rellena todos los campos', 'Error');
      return
    }
    this.budgetService.createBudget(this.newBudget).subscribe(
      () => {
        this.showInsertForm = false;
        this.loadBudgets();
        this.toastService.success('Presupuesto ingresado correctamente', 'Agregado');
        this.newBudget.month_year = ''
        this.newBudget.amount = 0
      },
      (error) => {
        console.error(error);
        this.toastService.error('Error al insertar el presupuesto', 'Error');
      }
    );
  }
}
