import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImportService } from '../../core/services/import.service';
import { ImportResult } from '../../core/models/product.model';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './import.html'
})
export class ImportComponent {
  form: FormGroup;
  loading = signal(false);
  result = signal<ImportResult | null>(null);
  errorMessage = signal<string | null>(null);

  constructor(private fb: FormBuilder, private importService: ImportService) {
    this.form = this.fb.group({
      url: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);
    this.result.set(null);
    this.errorMessage.set(null);

    const url = this.form.value.url!;

    this.importService.importFromUrl(url).subscribe({
      next: (result) => {
        this.result.set(result);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Не вдалося виконати імпорт. Перевірте посилання.');
        this.loading.set(false);
      }
    });
  }
}