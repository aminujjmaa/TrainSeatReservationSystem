import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatReservationService {
  seats: number[][] = [
    ...Array(11).fill(null).map(() => Array(7).fill(0)), // 11 rows of 7 seats
    Array(3).fill(0), // Last row with 3 seats
  ];

  constructor() {}

  // Function to book seats
  bookSeats(numSeats: number): { row: number; seat: number }[] | string {
    let reservedSeats: { row: number; seat: number }[] = [];
    let remainingSeats = numSeats;

    // Calculate total available seats
    const totalAvailableSeats = this.seats.flat().filter(seat => seat === 0).length;

    if (totalAvailableSeats < numSeats) {
      // Alert with the exact number of available seats
      return `Only ${totalAvailableSeats} seats are available`;
    }

    // Try to book seats in a single row first
    for (let i = 0; i < this.seats.length; i++) {
      let row = this.seats[i];
      let continuousSeats: { row: number; seat: number }[] = [];

      for (let j = 0; j < row.length; j++) {
        if (row[j] === 0) {  // Seat is available
          continuousSeats.push({ row: i + 1, seat: j + 1 });
          if (continuousSeats.length === numSeats) {
            // Reserve these seats
            continuousSeats.forEach(({ row, seat }) => {
              this.seats[row - 1][seat - 1] = 1;
            });
            return continuousSeats;
          }
        } else {
          continuousSeats = [];  // Reset if seat is not continuous
        }
      }
    }

    // If continuous seats are not available, book the exact number of seats
    for (let i = 0; i < this.seats.length && remainingSeats > 0; i++) {
      let row = this.seats[i];
      for (let j = 0; j < row.length && remainingSeats > 0; j++) {
        if (row[j] === 0) {
          this.seats[i][j] = 1;
          reservedSeats.push({ row: i + 1, seat: j + 1 });
          remainingSeats--;
        }
      }
      if (remainingSeats === 0) {
        return reservedSeats;  // Return reserved seats if booking is successful
      }
    }

    // If not enough seats are available
    return `Only ${totalAvailableSeats} seats are available`;
  }

  // Function to get the current seat layout
  getSeats() {
    return this.seats;
  }

  // Function to reset all seats
  resetSeats() {
    this.seats = [
      ...Array(11).fill(null).map(() => Array(7).fill(0)), // 11 rows of 7 seats
      Array(3).fill(0), // Last row with 3 seats
    ];
  }
}
