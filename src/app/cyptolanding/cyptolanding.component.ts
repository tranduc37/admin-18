import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { TablesModule } from '../pages/tables/tables.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-cyptolanding',
  templateUrl: './cyptolanding.component.html',
  styleUrls: ['./cyptolanding.component.scss'],
  imports:[CommonModule,AccordionModule,TablesModule,TabsModule,SlickCarouselModule,SharedModule],
  standalone:true,
  providers: []
})

/**
 * Crypto landing page
 */
export class CyptolandingComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  currentSection: any = 'home';

  // Timeline config
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  };
  // Team config
  config = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false
  };
  // About config
  aboutConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false
  };


  private _trialEndsAt;

  private _diff: number;
  _days: number;
  _hours: number;
  _minutes: number;
  _seconds: number;

  constructor() {

  }

  ngOnInit() {
    this._trialEndsAt = "2023-12-31";

    interval(3000).pipe(
      map((x) => {
        this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
      })).subscribe((x) => {
        this._days = this.getDays(this._diff);
        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
        this._seconds = this.getSeconds(this._diff);
      });
  }

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  /**
   * Window scroll method
   */
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      navbar.classList.add('nav-sticky')
    } else {
      navbar.classList.remove('nav-sticky')
    }
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('topnav-menu-content').classList.toggle('show');
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
}
