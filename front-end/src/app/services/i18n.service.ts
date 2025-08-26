import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';


type Dict = Record<string, any>;
const LS_KEY = 'i18n.lang';

@Injectable({providedIn: 'root'})
export class I18nService {

  private currentLang = signal<string>(localStorage.getItem(LS_KEY) || 'en');
  private dict = signal<Dict>({});
  lang = computed(() => this.currentLang());
  t = (key: string): string => this.resolve(key, this.dict());

  constructor(private http: HttpClient) { }

  async init(): Promise<void> {
    await this.load(this.currentLang());
  }

  async setLang(lang: 'en'){
    if ( lang === this.currentLang()) return;
    await this.load(lang)
  }

  private async load(lang: string){
    const url = `/i18n/${lang}.json`;
    const data = await this.http.get<Dict>(url).toPromise();
    this.dict.set(data || {});
    this.currentLang.set(lang);
    localStorage.setItem(LS_KEY, lang);
  }

  private resolve(key: string, d: Dict){
    return key.split('.').reduce((acc: any, part: string) => (acc && acc[part] !== undefined ? acc[part] : undefined), d)
    ?? key; 
    
  }
}
