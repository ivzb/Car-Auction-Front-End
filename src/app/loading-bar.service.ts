import { EventEmitter } from '@angular/core'

export class LoadingBarService {
    public progressIncrement: EventEmitter<number>
    public progressStart: EventEmitter<void>
    public progressComplete: EventEmitter<void>
    public progressStop: EventEmitter<void>
    public progressReset: EventEmitter<void>

    constructor() {
      this.progressIncrement = new EventEmitter<number>()
      this.progressStart = new EventEmitter<void>()
      this.progressComplete = new EventEmitter<void>()
      this.progressStop = new EventEmitter<void>()
      this.progressReset = new EventEmitter<void>()
    }

    incrementProgress(progress: number) {
      this.progressIncrement.emit(progress)
    }

    startProgress() {
      this.progressStart.emit()
    }

    completeProgress() {
      this.progressComplete.emit()
    }

    stopProgress() {
      this.progressStop.emit()
    }

    resetProgress() {
      this.progressReset.emit()
    }
}