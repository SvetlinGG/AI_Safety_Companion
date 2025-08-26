import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { I18nService } from './app/services/i18n.service';

bootstrapApplication(AppComponent, appConfig)
  .then((ref) => {
    const i18n = ref.injector.get(I18nService);
    return i18n.init();
  })
  .catch(err => console.error(err));
