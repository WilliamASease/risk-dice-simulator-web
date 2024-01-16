export type DieType = { value: number; active: boolean; defeated: boolean };

export type RollType = {
  atk: DieType[];
  def: DieType[];
  numAtkDefeated: number;
  numDefDefeated: number;
  balance: number;
  timeStamp?: number;
};

export type MessageLogType = {
  color: "red" | "blue" | "black";
  value: string;
  strike?: boolean;
}[];

export type SimulationType = {
  totalSimulations: number;
  atk: number;
  def: number;
  outcomes: Outcome[];
  probAtkSuccess: number;
  quartiles: [number, number, number, number, number];
  quartilesAtkRem: [number, number, number, number, number];
  quartilesDefRem: [number, number, number, number, number];
};

export type Outcome = { atkRem: number; defRem: number; atkSuccess: boolean };
