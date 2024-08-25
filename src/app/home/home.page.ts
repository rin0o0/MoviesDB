import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonBadge, 
    IonLabel,
    IonAlert,
    IonSkeletonText,
    IonAvatar,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent, 
    DatePipe,
    RouterModule
  ],
})
export class HomePage implements OnInit {
  private movieService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] =[] ;
  public imageBaseUrl = 'https://image.tmdb.org/t/p'
  public dummyArray = new Array(5);


  // Load the first page of movies during component initialization
  ngOnInit() {
    this.loadMovies();
  }
  

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    // Only show loading indicator on initial load
    if (!event) {
      this.isLoading = true;
    }

    //get top rated movies using movie service
    this.movieService.getTopRated(this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }),
      catchError((err: any) => {
        console.log(err);
        this.error = err.error.status_message;
        return []
      })
    ).subscribe({
      next: (res) => {
        // Append the results to our movies array
        this.movies.push(...res.results);

        // Resolve the infinite scroll promise to tell Ionic that we are done
        event?.target.complete();

        // Disable the infinite scroll when we reach the end of the list
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      },
    });
  }
  
   // This method is called by the infinite scroll event handler
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
