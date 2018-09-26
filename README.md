# ionicEjercicio2

- Se deben ejecutar los pasos del proyecto1 de Ionic.
- Este proyecto permite realizar el consumo de un API REST por medio del modulo HttpClientModule, ademas es necesario crear un provider que es el encargado del consumo del API REST. Estos dos componentes deben ser declarados en el archivo app.module.ts y el consumo del API REST se realiza desde el provider creado user-service.ts, posterirmente en el archivo TypeScript se hace el llamado al servicio (API REST) y en el html se visualiza el resultado del servicio. 

* Archivo app.module.ts
        import { HttpClientModule } from '@angular/common/http';
        import { UserServiceProvider } from '../providers/user-service/user-service';

        @NgModule({
            declarations: [
                MyApp,
                HomePage
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp)
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                {provide: ErrorHandler, useClass: IonicErrorHandler},
                UserServiceProvider
            ]
        })
        export class AppModule {}

* Archivo user-service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {
    constructor(public http: HttpClient) {
        console.log('Hello UserServiceProvider Provider');
    }

    getUsers() {
        return this.http.get('https://randomuser.me/api/?results=25');
    }
}

* Archivo TypeScript
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {

    users: any[] = [];
    constructor(public navCtrl: NavController, public UserServiceProvider: UserServiceProvider) {

    }

    ionViewDidLoad(){
        this.UserServiceProvider.getUsers()
        .subscribe(
            (data) => { // Success
                this.users = data['results'];
            },
            (error) =>{
                console.error(error);
            }
        )
    }
}

* Archivo HTML
<ion-content>
    <ion-list>
        <ion-item *ngFor="let user of users">
            <ion-avatar item-start>
                <img [src]="user.picture.medium">
            </ion-avatar>
            <h2>{{ user.name.first | uppercase }}</h2>
            <p>{{ user.email }}</p>
        </ion-item>
    </ion-list>
</ion-content>
