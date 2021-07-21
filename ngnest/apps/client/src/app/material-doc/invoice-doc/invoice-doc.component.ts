import { Component, OnInit } from '@angular/core';
import { Invoice } from '@authdare/invoice';

@Component({
  templateUrl: './invoice-doc.component.html',
  styleUrls: ['./invoice-doc.component.scss']
})
export class InvoiceDocComponent implements OnInit {
  invoice: Partial<Invoice> = {
    invoiceId: '123',
    businessName: 'Ahmet Emrebas',
    logo: '/assets/icons/icon-72x72.png',
    city: 'Houston',
    street: '123 Street',
    state: 'Texas',
    zip: '90900',
    phone: "+1 832 874 24 22",
    email: 'aemrebas.dev@gmail.com',
    clientName: 'Client Name',
    clientCity: 'Houston',
    clientStreet: "567 Street",
    clientState: 'Texas',
    clientZip: '99010',
    created: '10 Jun, 2020',
    due: '30 Jun, 2020',
    discount: "%12",
    items: [
      { discount: '0%', description: 'Description of the service', qty: 1, unitPrice: '$10000.00', name: 'Web based Inventory Application', price: '$10000.00' },
      { discount: '0%', description: 'Description of the service', qty: 1, unitPrice: '$10000.00', name: '1 year SMS service', price: '$200.00' },
      { discount: '0%', description: 'Description of the service', qty: 1, unitPrice: '$10000.00', name: '5 year hosting service', price: '$2000.00' },
      { discount: '0%', description: 'Description of the service', qty: 1, unitPrice: '$10000.00', name: '1 year emergency assistance', price: '$5000.00' }
    ],
    paymentMethods: [
      { name: "Check", credential: 'Ahmet Emrebas' },
      { name: 'CashApp', credential: 'aemrebas', },
      { name: 'Zelle', credential: '+1 832 874 24 22' },
      { name: 'Stripe', link: 'N/A', credential: 'N/A' }
    ],
    total: '$17200.00'
  }

  invoiceQR = JSON.stringify(this.invoice);
  constructor() { }

  ngOnInit(): void {
  }

}
