import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { environment } from "../environments/environment";
import { ProjectsComponent } from "./projects/projects.component";
import { ResourcesComponent } from "./resources/resources.component";
import { ResourceGroupComponent } from "./resources/resource-group.component";
import { MiscellaneousComponent } from "./home/miscellaneous.component";
import { InfantryBrowserComponent } from "./infantry/infantry-browser.component";
import { InfantryComponent } from "./infantry/infantry.component";
import { ExceptionFormatterComponent } from "./tools/exception-formatter.component";
import { Base64ConverterComponent } from "./tools/base64-converter.component";
import { HashComponent } from "./tools/hash.component";
import { ResumeComponent } from "./resume/resume.component";
import { MediaComponent } from "./media/media.component";
import { ConsentPromptComponent } from "./consent-prompt/consent-prompt.component";
import { WindowStickerLookupComponent } from "./window-sticker-lookup/window-sticker-lookup.component";
import { BooksComponent } from "./books/books.component";
import { BookDetailsComponent } from "./books/book-details.component";
import { RatingComponent } from "./shared/rating/rating.component";
import { AuthenticationHttpInterceptor } from "./authentication/authentication-http-interceptor";
import { AuthenticationGuard } from "./authentication/authentication-guard";
import { UsersComponent } from "./users/users.component";
import { AddUserComponent } from "./users/add-user.component";

const routes: Routes = [
    { path: "projects", component: ProjectsComponent, canActivate: [AuthenticationGuard] },
    { path: "resources", component: ResourcesComponent, canActivate: [AuthenticationGuard] },
    { path: "miscellaneous", component: MiscellaneousComponent, canActivate: [AuthenticationGuard] },
    { path: "infantry", component: InfantryComponent, canActivate: [AuthenticationGuard] },
    { path: "infantry/browser", component: InfantryBrowserComponent, canActivate: [AuthenticationGuard] },
    { path: "exception-formatter", component: ExceptionFormatterComponent, canActivate: [AuthenticationGuard] },
    { path: "base64-converter", component: Base64ConverterComponent, canActivate: [AuthenticationGuard] },
    { path: "hash-generator", component: HashComponent, canActivate: [AuthenticationGuard] },
    { path: "resume", component: ResumeComponent, canActivate: [AuthenticationGuard] },
    { path: "media", component: MediaComponent, canActivate: [AuthenticationGuard] },
    { path: "window-sticker-lookup", component: WindowStickerLookupComponent, canActivate: [AuthenticationGuard] },
    { path: "books", component: BooksComponent, canActivate: [AuthenticationGuard] },
    { path: "users", component: UsersComponent, canActivate: [AuthenticationGuard] },
    { path: "users/add-user", component: AddUserComponent, canActivate: [AuthenticationGuard] },
    { path: "", component: HomeComponent, pathMatch: "full", canActivate: [AuthenticationGuard] }
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
        MediaComponent,
        ConsentPromptComponent,
        WindowStickerLookupComponent,
        BooksComponent,
        BookDetailsComponent,
        RatingComponent,
        UsersComponent,
        AddUserComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationHttpInterceptor, multi: true },
        { provide: "API_URL", useValue: environment.apiUrl },
        { provide: "Window", useValue: window }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
