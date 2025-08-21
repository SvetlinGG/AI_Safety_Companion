import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { StepsComponent } from './pages/steps/steps.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'steps', component: StepsComponent},
    {path: 'settings', component: SettingsComponent},
];
