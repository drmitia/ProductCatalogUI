import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html'
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  productId: number | null = null;
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  get isEditMode(): boolean {
    return this.productId !== null;
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.productId = Number(idParam);
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number): void {
    this.loading.set(true);

    this.productService.getById(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl ?? ''
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Не вдалося завантажити товар');
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const request = {
      name: this.form.value.name!,
      description: this.form.value.description!,
      imageUrl: this.form.value.imageUrl || undefined
    };

    const save = this.isEditMode
      ? this.productService.update(this.productId!, request)
      : this.productService.create(request);

    save.subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage.set('Не вдалося зберегти товар');
      }
    });
  }
}