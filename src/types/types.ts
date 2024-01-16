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