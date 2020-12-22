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
import { RegisterComponent } from "./account/register.component";
import { LoginComponent } from "./account/login.component";
import { LogoutComponent } from "./account/logout.component";
import { MenuAuthenticationType } from "./menu/menu-authentication-type";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { LoadingHttpInterceptor } from "./loading-spinner/loading-http-interceptor";
import { CameraComponent } from "./cameras/camera.component";

const routes: Routes = [
    {
        path: "projects",
        component: ProjectsComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Projects",
                group: "Main",
                visible: true,
                order: 2
            }            
        }
    },
    {
        path: "media",
        component: MediaComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Media",
                group: "Main",
                visible: false,
                order: 3
            }
        }
    },
    {
        path: "books",
        component: BooksComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Books",
                group: "Main",
                visible: true,
                order: 4
            }
        }
    },
    {
        path: "resume",
        component: ResumeComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Resume",
                group: "Main",
                visible: false,
                order: 5
            }
        }
    },
    {
        path: "resources",
        component: ResourcesComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Resources",
                group: "Main",
                visible: true,
                order: 6
            }
        }
    },
    {
        path: "miscellaneous",
        component: MiscellaneousComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Misc",
                group: "Main",
                visible: true,
                order: 7
            }
        }
    },
    {
        path: "cameras",
        component: CameraComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Cameras",
                group: "Main",
                visible: true,
                order: 8,
                authentication: MenuAuthenticationType.required
            }
        }
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Login",
                group: "Account",
                visible: true,
                order: 9,
                authentication: MenuAuthenticationType.unauthenticated
            }
        }
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Register",
                group: "Account",
                visible: false,
                order: 10,
                authentication: MenuAuthenticationType.unauthenticated
            }
        }
    },
    {
        path: "logout",
        component: LogoutComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Logout",
                group: "Account",
                visible: true,
                order: 11,
                authentication: MenuAuthenticationType.required
            }
        }
    },   
    {
        path: "users",
        component: UsersComponent,
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "User List",
                group: "Users",
                visible: true,
                order: 12,
                authentication: MenuAuthenticationType.required
            }
        }
    },
    //{
    //    path: "admin/books",
    //    component: AdminBooksComponent,
    //    canActivate: [AuthenticationGuard],
    //    data: {
    //        menu: {
    //            title: "Books",
    //            group: "Admin",
    //            visible: true,
    //            order: 13,
    //            authentication: MenuAuthenticationType.required
    //        }
    //    }
    //}, 
    { path: "infantry", component: InfantryComponent, canActivate: [AuthenticationGuard] },
    { path: "infantry/browser", component: InfantryBrowserComponent, canActivate: [AuthenticationGuard] },
    { path: "exception-formatter", component: ExceptionFormatterComponent, canActivate: [AuthenticationGuard] },
    { path: "base64-converter", component: Base64ConverterComponent, canActivate: [AuthenticationGuard] },
    { path: "hash-generator", component: HashComponent, canActivate: [AuthenticationGuard] },
    { path: "window-sticker-lookup", component: WindowStickerLookupComponent, canActivate: [AuthenticationGuard] },    
    { path: "users/add-user", component: AddUserComponent, canActivate: [AuthenticationGuard] },
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
        canActivate: [AuthenticationGuard],
        data: {
            menu: {
                title: "Home",
                group: "Main",
                visible: true,
                order: 1
            }
        }
    }
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
        AddUserComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        LoadingSpinnerComponent,
        CameraComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationHttpInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingHttpInterceptor, multi: true },
        { provide: "API_URL", useValue: environment.apiUrl },
        { provide: "Window", useValue: window }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
