import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core.module'
import { MaterialAllModule } from './modules/material-all.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule } from '@uiowa/spinner';
import { AppErrorHandler } from './app-error.handler';

import { AppComponent } from '../app/app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProductsComponent } from './components/products/products.component';
import { OfferComponent } from './components/offer/offer.component';
import { TradesComponent } from './components/trades/trades.component';
import { StudentFormsComponent } from './components/student-forms/student-forms.component';
import { MultipleFilesUploadComponent } from './components/multiple-files-upload/multiple-files-upload.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';

import { GameBoardComponent } from './components/color-game/game-board/game-board.component';
import { ColorBlockComponent } from './components/color-game/color-block/color-block.component';
import { InstructionsComponent } from './components/color-game/instructions/instructions.component';
import { PlayersComponent } from './components/color-game/players/players.component';

import { BooleanPipe } from './pipes/boolean.pipe';
import { ConfigurationService } from './services/configuration.service';
import { DataService } from './services/data.service';
import { DBStorageService } from './services/db-storage.service';
import { GameService } from './services/game.service';
import { TradeService } from './services/trade.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    LoginComponent,
    HomeComponent,
    NotificationsComponent,
    ProductsComponent,
    OfferComponent,
    TradesComponent,
    StudentFormsComponent,
    MultipleFilesUploadComponent,
    ColorBlockComponent,
    GameBoardComponent,
    InstructionsComponent,
    PlayersComponent,
    ConfigurationsComponent,
    BooleanPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SpinnerModule,
    
    ReactiveFormsModule,
    CoreModule,
    MaterialAllModule,
    NgbModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    ConfigurationService,
    DataService,
    TradeService,
    DBStorageService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
