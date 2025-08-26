import { Pipe, PipeTransform, inject, effect } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private i18n = inject(I18nService);
  private _val = '';
  private _key = '';

  constructor() {
    // re-run pipe on lang change
    effect(() => {
      if (this._key) this._val = this.i18n.t(this._key);
    });
  }

  transform(key: string): string {
    this._key = key;
    this._val = this.i18n.t(key);
    return this._val;
  }
}
