import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {Http, HttpModule} from '@angular/http'
import {LoginService} from './service/login';
import {AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule,[HttpModule,LoginService]);