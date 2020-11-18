import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { ProjectsComponent } from './projects/projects.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceGroupComponent } from './resources/resource-group.component';
import { MiscellaneousComponent } from './home/miscellaneous.component';
import { InfantryBrowserComponent } from './infantry/infantry-browser.component';
import { InfantryComponent } from './infantry/infantry.component';
import { ExceptionFormatterComponent } from './tools/exception-formatter.component';
import { Base64ConverterComponent } from './tools/base64-converter.component';
import { HashComponent } from './tools/hash.component';
import { ResumeComponent } from './resume/resume.component';
import { MediaComponent } from './media/media.component';

const routes: Routes = [
    { path: 'projects', component: ProjectsComponent },
    { path: 'resources', component: ResourcesComponent },
    { path: 'miscellaneous', component: MiscellaneousComponent },
    { path: 'infantry', component: InfantryComponent },
    { path: 'infantry/browser', component: InfantryBrowserComponent },
    { path: 'exception-formatter', component: ExceptionFormatterComponent },
    { path: 'base64-converter', component: Base64ConverterComponent },
    { path: 'hash-generator', component: HashComponent },
    { path: 'resume', component: ResumeComponent },
    { path: 'media', component: MediaComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent,
        ProjectsComponent,
        ResourcesComponent,
        ResourceGroupComponent,
        MiscellaneousComponent,
        InfantryBrowserComponent,
        InfantryComponent,
        ExceptionFormatterComponent,
        Base64ConverterComponent,
        HashComponent,
        ResumeComponent,
        MediaComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        { provide: "API_URL", useValue: environment.apiUrl }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
