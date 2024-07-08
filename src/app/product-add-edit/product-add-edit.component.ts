import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/ProductService';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent {
  @Input() selectedProduct: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();
  
  productForm: FormGroup;
  isEditMode = false;
  
  categories = ['Electronics', 'Books', 'Clothing', 'Food', 'Jewellery'];
  conditions = ['New', 'Used', 'Refurbished'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      condition: ['', Validators.required],
      available: [false],
      releaseDate: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.isEditMode = true;
        this.productService.getById(productId).subscribe(product => {
          this.productForm.patchValue(product);
        });
      } else {
        this.isEditMode = false;
        this.resetForm();
      }
    });
  }

  ngOnInit(): void {
    if (this.selectedProduct) {
      this.isEditMode = true;
      this.productForm.patchValue(this.selectedProduct);
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product: Product = {
        ...this.productForm.value,
        id: this.selectedProduct?.id || 0
      };

      if (this.isEditMode) {
        this.productService.update(product).subscribe(() => {
          this.close();
        });
      } else {
        this.productService.create(product).subscribe(() => {
          this.close();
        });
      }
    }
  }

  resetForm(): void {
    this.productForm.reset();
  }

  close(): void {
    this.closeModal.emit();
  }
}
