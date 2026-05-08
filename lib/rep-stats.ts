export interface RepStats {
  id: string;
  jobsCompleted: number;
  rating: number;
  hoursWorked: number;
}

export async function getRepStats(repId: string): Promise<RepStats> {
  return {
    id: repId,
    jobsCompleted: 0,
    rating: 5,
    hoursWorked: 0,
  };
}
