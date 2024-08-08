export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
  }
  
  export interface Job {
    id: string;
    carId: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
  }