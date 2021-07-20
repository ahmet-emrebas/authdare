import { Component, OnInit } from '@angular/core';
import { Invoice } from '@authdare/invoice';

@Component({
  templateUrl: './invoice-doc.component.html',
  styleUrls: ['./invoice-doc.component.scss']
})
export class InvoiceDocComponent implements OnInit {
  invoice: Partial<Invoice> = {
    invoiceId: '123',
    businessAddress: '1234 Dr, Houston, TX 90900',
    businessName: 'Ahmet Emrebas',
    logo: '/assets/icons/icon-72x72.png',
    clientBusinessAdress: '3312 client, Houston, TX 88040',
    clientBusinessName: 'Client Business Name',
    clientEmail: 'client@client.com',
    created: '10 Jun, 2020',
    due: '30 Jun, 2020',
    discount: "%12",
    items: [
      { name: 'Web based Inventory Application', price: '$10000.00' },
      { name: '1 year SMS service', price: '$200.00' },
      { name: '5 year hosting service', price: '$2000.00' },
      { name: '1 year emergency assistance', price: '$5000.00' }
    ],
    paymentMethods: [
      { name: 'CashApp', link: 'N/A', credential: 'aemrebas', },
      { name: 'Zelle', link: 'N/A', credential: '+1 832 874 24 22' },
      { name: 'Stripe', link: 'N/A', credential: 'N/A' }
    ],
    total: '$17200.00'
  }

  invoiceQR = JSON.stringify(this.invoice);
  constructor() { }

  ngOnInit(): void {
  }

}
