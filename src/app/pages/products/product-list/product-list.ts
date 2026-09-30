import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { PagedResult, Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {
  result = signal<PagedResult<Product> | null>(null);
  page = signal(1);
  pageSize = 12;
  loading = signal(false);
  expandedIds = signal<ReadonlySet<number>>(new Set());

  constructor(private productService: ProductService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);

    this.productService.getPaged(this.page(), this.pageSize).subscribe({
      next: (result) => {
        this.result.set(result);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.page.set(page);
    this.loadProducts();
  }

  deleteProduct(id: number): void {
    const confirmed = confirm('Видалити цей товар?');
    if (!confirmed) {
      return;
    }

    this.productService.delete(id).subscribe({
      next: () => {
        this.loadProducts();
      }
    });
  }

  isExpanded(productId: number): boolean {
    return this.expandedIds().has(productId);
  }

  toggleExpanded(productId: number): void {
    const next = new Set(this.expandedIds());
    if (next.has(productId)) {
      next.delete(productId);
    } else {
      next.add(productId);
    }

    this.expandedIds.set(next);
  }

  totalPages(): number {
    const result = this.result();
    if (result === null || result.pageSize === 0) {
      return 1;
    }

    return Math.ceil(result.totalCount / result.pageSize);
  }

  pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }

    return pages;
  }
}