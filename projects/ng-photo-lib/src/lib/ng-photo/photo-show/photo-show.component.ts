import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { PhotoModel } from '../photo.model';

@Component({
  selector: 'lib-photo-show',
  templateUrl: './photo-show.component.html',
  styleUrls: ['./photo-show.component.scss']
})
export class PhotoShowComponent implements AfterViewInit {

  @Input() photos: (string|PhotoModel)[];
  @Input() interval = 8;

  current: string|PhotoModel;
  running = true;

  constructor() { }

  // This function loops infinitely to keep scheduling the background to change
  ngAfterViewInit(): void {

    // Start the sequence
    this.runSequence();
  }

  // Define the sequence that will be run every <secs> seconds
  private runSequence(): void {
    window.clearTimeout();

    if (this.photos) {

      // Schedule each image in the array to be displayed <secs> seconds apart.
      // On the last interation, start the sequence over
      let k = 0;
      for (let i = 0; i < this.photos.length; i++) {
        setTimeout(() => {
          this.current = this.photos[k];
          if ((k + 1) === this.photos.length) {
            setTimeout(() => { this.runSequence(); }, (this.interval * 1000));
          } else {
            k++;
          }
        }, (this.interval * 1000) * i);
      }
    }
  }

  // Stops the sequence
  public stop(): void {
    this.running = false;
    window.clearTimeout();
  }

  // Restarts the sequence
  public restart(): boolean {
    if (!this.running) {
      this.running = true;
      this.runSequence();
      return true;
    }
    console.log('Sequence is already running');
    return false;
  }

}
