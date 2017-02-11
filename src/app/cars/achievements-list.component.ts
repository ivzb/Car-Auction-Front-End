import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AchievementService } from './achievement.service';
import { Achievement } from './achievement';
import { AchievementsWrapper } from './achievements-wrapper';

declare var loader: any;

@Component({
  templateUrl: './achievements-list.template.html'
})

export class AchievementsListComponent {
    achievements: Achievement[];
    currentPage: number;
    lastPage: number;
    isInSearchMode: boolean = false;
    searchPhrase: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: AchievementService
    ) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                loader.start();

                this.searchPhrase = this.route.snapshot.params['search'];
                this.currentPage = +this.route.snapshot.params['page'];
                if (isNaN(this.currentPage)) this.currentPage = 1;
                window.scrollTo(0, 0);

                if (this.searchPhrase != undefined) {
                    this.isInSearchMode = true;
                    this.searchAchievements(this.searchPhrase, this.currentPage);
                } else {
                    this.isInSearchMode = false;
                    this.getAchievements(this.currentPage);
                }
            }
        });
    }

    onSelect(achievement: Achievement) {
        this.router.navigate(['/achievement', achievement.Id]);
    }

    search() {
      if (this.searchPhrase.length > 0) {
        this.router.navigate(['/achievements', this.searchPhrase, 1]);
      }
    }

    private getAchievements(page: number) {
        this.service
            .getAchievements(page)
            .then(achievementsWrapper => {
                this.achievements = achievementsWrapper.Achievements;
                this.currentPage = achievementsWrapper.CurrentPage;
                this.lastPage = achievementsWrapper.LastPage;
                loader.done();
            });
            //.catch(error => this.error = error); // TODO: Display error message
    }

    private searchAchievements(searchPhrase: string, page: number) {
        this.service
            .searchAchievements(searchPhrase, page)
            .then(achievementsWrapper => {
                this.achievements = achievementsWrapper.Achievements;
                this.currentPage = achievementsWrapper.CurrentPage;
                this.lastPage = achievementsWrapper.LastPage;
                loader.done();
            });
            //.catch(error => this.error = error); // TODO: Display error message
    }
}