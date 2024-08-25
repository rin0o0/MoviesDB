import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonLabel, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { MovieService } from 'src/app/services/movie.service';
import { MovieResult } from 'src/app/services/interfaces';
import {cashOutline, calendarOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonCardContent,
    IonText,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CurrencyPipe,
    DatePipe
  ]
})
export class DetailsPage {
  private movieService = inject(MovieService)
  public imageBaseUrl = 'https://image.tmdb.org/t/p'
  public movie: WritableSignal<MovieResult | null> = signal(null);


  // Load the movie details when the id changes through the URL :id parameter
  @Input()
  set id(movieID: string) { 
    this.movieService.getMovieDetails(movieID).subscribe((movie) => {
      console.log(movie);
      this.movie.set(movie)
    });
  }
  constructor() { 
    //adding icons from ionicons
    //remember to import your icons and AddIcons like this: 
    //import {cashOutline, calendarOutline} from 'ionicons/icons'
    //import { addIcons } from 'ionicons';
    addIcons({cashOutline, calendarOutline})
  }

}
