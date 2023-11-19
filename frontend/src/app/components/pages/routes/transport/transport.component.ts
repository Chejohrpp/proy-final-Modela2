import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/models/branch.model';
import { Payment, PaymentMaintenanceRequest, PaymentSpecial } from 'src/app/models/payment.model';
import { Transport } from 'src/app/models/transport.model';
import { BranchService } from 'src/app/services/branch.service';
import { PaymentService } from 'src/app/services/payment.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

  branches: Branch[];
  transport: Transport = new Transport();
  newPayment: Payment = new Payment();
  newPaymentSpecial: PaymentSpecial = new PaymentSpecial();
  show = {
    transport: {
      showForm: false
    },
    payment: {
      showForm: false
    }
  };
  transports: Transport[];
  filterTransports: Transport[];
  filterTransport: any;
  transportSelected = null;
  defaultDescription = "";

  constructor(
    private branchService: BranchService,
    private toastService: ToastrService,
    private transportService: TransportService,
    private paymentService: PaymentService
  ) {

  }

  filter() {
    this.filterTransports = this.transports.filter((transport) =>
      (transport.id_transport + "").includes(this.filterTransport)
    );
    if (this.filterTransports.length == 0) {
      this.filterTransports = this.transports;
      this.toastService.error('No hay transportes con la placa ingresada');
    }
  }

  saveTransport() {
    if (this.transport.id_transport && this.transport.tonnage) {
      this.transportService.addTransport(this.transport).subscribe({
        next: (response: any) => {
          this.show.transport.showForm = false;
          this.getListTransport();
          this.toastService.success(response.message);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.toastService.error('Ingresa todos los campos necesarios');
    }
  }

  savePayment() {
    if (this.newPayment.amount) {
      this.newPaymentSpecial.description = this.defaultDescription + " | " + (this.newPaymentSpecial.description ? this.newPaymentSpecial.description : '');
      this.newPaymentSpecial.name = 'MANTENIMIENTO';
      this.newPayment.type = 'MANTENIMIENTO';
      this.newPayment.date = new Date().toISOString().split('T')[0];
      var request = new PaymentMaintenanceRequest();
      request.payment = this.newPayment;
      request.special = this.newPaymentSpecial;
      request.transport = this.transportSelected;
      this.paymentService.addPaymentMaintenance(request).subscribe({
        next: (response: any) => {
          this.show.payment.showForm = false;
          this.defaultDescription = "";
          this.newPayment = new Payment();
          this.newPaymentSpecial = new PaymentSpecial();
          this.toastService.success(response.message);
          this.getListTransport();
        },
        error: (error) => {
          console.log(error);

        }
      })
    }
  }

  paymentMaintenance(transport: any) {
    if (transport.maintenance) {
      this.show.payment.showForm = true;
      this.defaultDescription = 'Pago del mantenimiento del transporte con placas ' + transport.id_transport;
      this.transportSelected = transport.id_transport;

    } else {
      if (!transport.active) {
        this.paymentService.toMaintenance({ transport: transport.id_transport }).subscribe({
          next: (response: any) => {
            this.toastService.success('Ingresado a mantenimiento');
            this.getListTransport();
          },
          error: (error) => {
            this.toastService.error("Error al ingresar a mantenimiento al transporte");
          }
        })
      } else {
        this.toastService.error("No se puede enviar a mantenimiento a un transporte en ruta");
      }
    }
  }

  ngOnInit(): void {
    this.branchService.getBranches().subscribe({
      next: (response: Branch[]) => {
        this.branches = response;
        this.getListTransport();
      },
      error: (error) => {
        this.toastService.error("Error al obtener las ramas, recarga la página");
      }
    });
  }

  getListTransport() {
    this.transportService.getTransports().subscribe({
      next: (response: any) => {
        this.transports = response;
        this.filterTransports = response;
      },
      error: (error: any) => {
        this.toastService.error("Error al obtener los transportes, recarga la página");
      }
    })
  }

  getBranchName(id_branch: number) {
    var branchName = '';
    for (let i = 0; i < this.branches.length; i++) {
      const element = this.branches[i];
      if (element.id_branch == id_branch) {
        branchName = element.name;
        break;
      }
    }
    return branchName;
  }
}
