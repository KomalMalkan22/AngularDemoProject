import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/ProductService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../services/auth.service';
import { NgxPrintService, PrintOptions } from 'ngx-print';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  dataSource: MatTableDataSource<Product>;
  showModal = false;
  modalTitle!: string;
  selectedProduct: Product | null = null;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  element: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private printService: NgxPrintService
  ) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService.getAll().subscribe(products => {
      products.sort((a, b) => a.name.localeCompare(b.name));
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
    });
  }

  openProductAddEditModal(productId?: number): void {
    if (productId) {
      this.productService.getById(productId).subscribe(product => {
        this.selectedProduct = product;
        this.showModal = true;
      });
    } else {
      this.selectedProduct = null;
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.loadData();
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
    });
  }

  logout(){
    this.authService.logout();
  }

  printMe() {
    const customPrintOptions: PrintOptions = new PrintOptions({
        printSectionId: 'print-section',
    });
    this.printService.print(customPrintOptions)
  }

  // shareRecord(record: any) {
  //   const recordDetails = `ID: ${record.id}, Name: ${record.name}, Description: ${record.description}`;
  //   navigator.clipboard.writeText(recordDetails).then(() => {
  //     this.snackBar.open('Record details copied to clipboard!', 'Close', {
  //       duration: 2000,
  //     });
  //   }).catch(err => {
  //     this.snackBar.open('Failed to copy record details.', 'Close', {
  //       duration: 2000,
  //     });
  //   });
  // }

  // shareRecord(record: any) {
  //   const recordDetails = `ID: ${record.id}, Name: ${record.name}, Description: ${record.description}`;
  //   const mailtoLink = `mailto:?subject=Record Details&body=${encodeURIComponent(recordDetails)}`;
  //   window.location.href = mailtoLink;
  // }
}
