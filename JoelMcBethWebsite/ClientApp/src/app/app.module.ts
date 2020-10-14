import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent,
        ProjectsComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'projects', component: ProjectsComponent }
        ])
    ],
    providers: [
        { provide: 'API_URL', useValue: environment.apiUrl }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
