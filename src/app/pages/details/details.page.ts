import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MovieService } from 'src/app/services/movie.service';
import { MovieResult } from 'src/app/services/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage {
  private movieService = inject(MovieService)
  public imageBaseUrl = 'https://image.tmdb.org/t/p'
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieID: string) { 
    this.movieService.getMovieDetails(movieID).subscribe((movie) => {
      console.log(movie);
      this.movie.set(movie)
    });
  }
  constructor() { }

}
