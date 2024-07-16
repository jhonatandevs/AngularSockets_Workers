import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular-17-app';
  city='Popayan';
  primes: number[] = [];
  worker: Worker| undefined;
  worker1: Worker | undefined;
  worker2: Worker | undefined;
  result1: number | undefined;
  result2: number | undefined;
  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      this.worker1 = new Worker(new URL('./workers/worker1.worker', import.meta.url));
      this.worker1.onmessage = ({ data }) => {
        this.result1 = data;
      };

      this.worker2 = new Worker(new URL('./workers/worker2.worker', import.meta.url));
      this.worker2.onmessage = ({ data }) => {
        this.result2 = data;
      };
    } else {
      console.error('Web Workers are not supported in this environment.');
    }
  }

  startWorkers(input: number): void {
    if (this.worker1) {
      this.worker1.postMessage(input);
    }

    if (this.worker2) {
      this.worker2.postMessage(input);
    }
  }
  findPrimes() {
    if (this.worker) {
      const start = 2;
      const end = 1000; // Adjust the range as needed
      this.worker.postMessage({ start, end });
    }
  }
}
