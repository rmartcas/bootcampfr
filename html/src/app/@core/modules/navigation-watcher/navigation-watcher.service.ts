import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';


/**
 * @description Reusable Provider can be used to watch
 *  when navigation Starts and ends
 *
 *
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationWatcher {

  isNavigationPending$: Observable<boolean> = this.router.events.pipe(
    filter((event) => this.isConsideredEvent(event)), // Filters the Observable for specific Events
    map((event) => this.isNavigationStart(event)),
    distinctUntilChanged(),
  );

  constructor(private readonly router: Router) { }

  private isNavigationStart(event): boolean {
    return event instanceof NavigationStart;
  }

  private isNavigationEnd(event: RouterEvent): boolean {
    return event instanceof NavigationEnd
      || event instanceof NavigationCancel
      || event instanceof NavigationError;
  }

  private isConsideredEvent(event): boolean {
    return this.isNavigationStart(event) || this.isNavigationEnd(event);
  }

}
