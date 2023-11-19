import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-expense-encomienda',
  templateUrl: './create-expense-encomienda.component.html',
  styleUrls: ['./create-expense-encomienda.component.scss']
})
export class CreateExpenseEncomiendaComponent {


  expenseData = {
    amount: 0,
    type: '',
    date: '',
    description: '',
  };
  
  constructor(private mainService: MainService) {}

  submitForm(): void {
    console.log(this.expenseData)
    if (!this.expenseData.amount || !this.expenseData.date || !this.expenseData.description || !this.expenseData.type) {
      alert('Por favor, complete todos los campos del formulario.');
      return;
    }

    this.mainService.createExpense(this.expenseData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
