class Minutes {
  minutes: number;
  constructor(number: number) {
    this.minutes = number;
  }

  showSeconds() {
    return this.minutes * 60;
  }
}

class Seconds {
  seconds: number;
  constructor(number: number) {
    this.seconds = number;
  }

  showSeconds() {
    return this.seconds;
  }
}

export { Minutes, Seconds };
