import { Component, Input, OnInit } from '@angular/core';

export interface Invoice {
  invoiceId: string;
  logo: string;
  businessName: string;
  businessAddress: string;
  paymentMethods: { name: string, link?: string; credential?: string }[]
  clientBusinessName: string;
  clientBusinessAdress: string;
  clientEmail: string;

  created: string;
  due: string;
  items: { name: string, price: string }[];
  discount: string;
  total: string;
}

@Component({
  selector: 'authdare-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @Input() invoice!: Partial<Invoice>;
  invoiceQR!: string;
  constructor() { }

  ngOnInit(): void {
    this.invoiceQR = JSON.stringify(this.invoice)
  }
}
