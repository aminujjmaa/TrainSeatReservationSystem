import { Component } from '@angular/core';
import { SeatReservationService } from './seat-reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seats: number[][] = [];
  numSeats: number = 1; // Default number of seats to book is 1
  reservedSeats: { row: number; seat: number }[] = [];
  lastBookedSeats: { row: number; seat: number }[] = []; // Variable to store last booked seats

  constructor(private seatReservationService: SeatReservationService) {
    this.seats = this.seatReservationService.getSeats();
  }

  onReserveSeats() {
    if (this.numSeats > 7) {
      // Pop-up alert if user tries to book more than 7 seats
      window.alert("You cannot book more than 7 seats at a time.");
      return;
    }

    const result = this.seatReservationService.bookSeats(this.numSeats);
    if (typeof result === 'string') {
      // Pop-up alert with the exact number of available seats
      window.alert(result); // Will display the message with the number of available seats
    } else {
      // Successfully reserved seats, update reserved seats list and last booked seats
      this.reservedSeats = result;
      this.lastBookedSeats = result; // Store the last booked seats
      this.seats = this.seatReservationService.getSeats(); // Update seat layout
    }
  }

  // Reset seat layout
  resetSeats() {
    this.seatReservationService.resetSeats();
    this.seats = this.seatReservationService.getSeats();
    this.reservedSeats = [];  // Clear the reserved seats list
    this.lastBookedSeats = []; // Clear last booked seats
  }
}
