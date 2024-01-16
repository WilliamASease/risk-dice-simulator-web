import { DieType, MessageLogType, RollType } from "../types/types";

export function rollDie() {
  return Math.floor(Math.random() * 6 + 1);
}


export function battle(atk: number, def: number): RollType {
  let atkDice: DieType[] = Array.from(new Array(atk))
    .map(() => {
      return { value: rollDie(), active: true, defeated: false };
    })
    .sort((a, b) => a.value - b.value);
  let defDice: DieType[] = Array.from(new Array(def))
    .map(() => {
      return { value: rollDie(), active: true, defeated: false };
    })
    .sort((a, b) => a.value - b.value);

  if (atk - def >= 1) {
    //3x2
    atkDice[0].active = false;
    if (atk - def === 2) {
      //3x1
      atkDice[1].active = false;
    }
  }
  if (def - atk === 1) {
    //1x2
    defDice[0].active = false;
  }
  const shotsToFire = atkDice.filter((d) => d.active).length;
  let numAtkDefeated = 0;
  let numDefDefeated = 0;
  for (let i = 1; i <= shotsToFire; i++) {
    if (
      defDice[defDice.length - i].value >= atkDice[atkDice.length - i].value
    ) {
      atkDice[atkDice.length - i].defeated = true;
      numAtkDefeated++;
    } else {
      defDice[defDice.length - i].defeated = true;
      numDefDefeated++;
    }
  }

  // logUtil(atkDice, defDice, numAtkDefeated, numDefDefeated)
  return {
    atk: atkDice.sort(() => Math.random() - 0.5),
    def: defDice.sort(() => Math.random() - 0.5),
    numAtkDefeated: numAtkDefeated,
    numDefDefeated: numDefDefeated,
    balance: numAtkDefeated - numDefDefeated,
    timeStamp: Date.now(),
  };
}

export const logRoll : (roll:RollType) => MessageLogType = (roll) => {
  let outcome = {color:"black" as "black" | "blue" | "red", value:"DRAW"};
  if (roll.balance !== 0) {
   outcome = {color:roll.balance < 0 ? "red" as "red" : "blue" as "blue", value:  `WIN x${Math.abs(roll.balance)}`}
  }

  return [
    ...roll.atk.map((v) => ({color:"red" as "red", value:`${v.value}`, strike:v.defeated})), 
    ...roll.def.map((v) => ({color:"blue" as "blue", value:`${v.value}`, strike:v.defeated})), outcome]
}
