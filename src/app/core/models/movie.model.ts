// core/models/movie.model.ts
export interface Movie {
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
  }
  
  export interface YearWithMultipleWinners {
    year: number;
    winnerCount: number;
  }
  
  export interface StudioWinCount {
    name: string;
    winCount: number;
  }
  
  export interface ProducerWinInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }
  