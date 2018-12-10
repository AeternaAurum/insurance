import { Component, OnInit } from '@angular/core';
import { PlaceholderService } from 'src/app/services/placeholder.service';
import { Placeholder } from './../../shared/placeholder';


@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {
  placeholders: [Placeholder];

  constructor(private placeholderService: PlaceholderService) {}

  ngOnInit() {
    this.renderPlaceholders();
    setTimeout(() => {
      console.log(this.placeholders);
    }, 2000);
  }

  renderPlaceholders() {
    this.placeholderService
      .getJson()
      .subscribe((data: [Placeholder]) => (this.placeholders = data));
  }
}
