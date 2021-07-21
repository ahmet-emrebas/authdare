import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf'

export interface Invoice {
  invoiceId: string;
  logo: string;
  businessName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  paymentMethods: { name: string, link?: string; credential?: string }[]
  clientName: string;
  clientStreet: string;
  clientCity: string;
  clientState: string;
  clientZip: string;
  created: string;
  due: string;
  items: { name: string, description: string, unitPrice: string, qty: number, discount: string, price: string }[];
  discount: string;
  total: string;
}

@Component({
  selector: 'authdare-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @ViewChild('invoiceRef') invoiceRef!: ElementRef<HTMLDivElement>;
  @Input() invoice!: Partial<Invoice>;
  invoiceQR!: string;
  constructor() { }

  ngOnInit(): void {
    this.invoiceQR = JSON.stringify(this.invoice)
  }

  printPDF() {

    this.invoiceRef.nativeElement.style.width = '595px'

    setTimeout(() => {
      const doc = new jsPDF('p', 'pt', 'a4')
      doc.addFont('/assets/fonts/Material-Icons/Material-icons.scss', 'Material Icons', 'filled')
      doc.setProperties({ author: 'Ahmet Emrebas', keywords: 'Invoice', subject: 'Invoice', title: 'Invoice' })
      doc.html(this.invoiceRef.nativeElement, {
        callback: (pdf) => {

          doc.save('ae-invoice.pdf');
          this.invoiceRef.nativeElement.style.width = '100%'
          this.invoiceRef.nativeElement.style.opacity = '1'
        }
      });
    }, 1000);
  }

}
