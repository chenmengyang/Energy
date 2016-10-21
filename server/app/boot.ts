import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {Http, HTTP_PROVIDERS} from '@angular/http'
import {LoginService} from './service/login';
// import {HeadersService} from './service/header';
import {AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule,[HTTP_PROVIDERS,LoginService]);