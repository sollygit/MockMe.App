import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { JsonComponent } from './components/json/json.component';
import { OfferComponent } from './components/offer/offer.component';
import { GameBoardComponent } from './components/color-game/game-board/game-board.component';
import { TradesComponent } from './components/trades/trades.component';
import { StudentFormsComponent } from './components/student-forms/student-forms.component';
import { MultipleFilesUploadComponent } from './components/multiple-files-upload/multiple-files-upload.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TradesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: TradesComponent },
  { path: 'play', component: GameBoardComponent },
  { path: 'json', component: JsonComponent },
  { path: 'starwars', component: MoviesComponent },
  { path: "starwars/:provider/:id", component: MovieComponent },
  { path: 'offer', component: OfferComponent, canActivate: [AuthGuard] },
  { path: 'file', component: StudentFormsComponent, canActivate: [AuthGuard] },
  { path: 'file/multiple', component: MultipleFilesUploadComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ConfigurationsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
