import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  
  constructor(private mainService: MainService,private toastService: ToastrService) {}

  submitForm(): void {
    console.log(this.expenseData)
    if (!this.expenseData.amount || !this.expenseData.date || !this.expenseData.description || !this.expenseData.type) {
      this.toastService.error('Por favor, complete todos los campos del formulario');
      return;
    }

    this.mainService.createExpense(this.expenseData).subscribe(
      (response) => {
        console.log(response);
        this.toastService.success(response.message);
      },
      (error) => {
        console.error(error);
        this.toastService.error('Error en el servidor, vuelve a intentarlo');
      }
    );
  }

}
