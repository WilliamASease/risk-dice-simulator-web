import {
  DieType,
  MessageLogType,
  Outcome,
  RollType,
  SimulationType,
} from "../types/types";

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

export const logRoll: (roll: RollType) => MessageLogType = (roll) => {
  let outcome = { color: "black" as "black" | "blue" | "red", value: "DRAW" };
  if (roll.balance !== 0) {
    outcome = {
      color: roll.balance < 0 ? ("red" as "red") : ("blue" as "blue"),
      value: `WIN x${Math.abs(roll.balance)}`,
    };
  }

  return [
    ...roll.atk.map((v) => ({
      color: "red" as "red",
      value: `${v.value}`,
      strike: v.defeated,
    })),
    ...roll.def.map((v) => ({
      color: "blue" as "blue",
      value: `${v.value}`,
      strike: v.defeated,
    })),
    outcome,
  ];
};

export const simulate: (
  totalSimulations: number,
  atkMen: number,
  defMen: number
) => SimulationType = (
  totalSimulations: number,
  atkMen: number,
  defMen: number
) => {
  let quartiles = [
    0,
    Math.floor(totalSimulations * 0.25),
    Math.floor(totalSimulations * 0.5),
    Math.floor(totalSimulations * 0.75),
    totalSimulations - 1,
  ] as [number, number, number, number, number];

  let outcomes: Outcome[] = [];
  for (let i = 0; i < totalSimulations; i++) {
    let atk = atkMen;
    let def = defMen;
    while (atk > 0 && def > 0) {
      let roll = battle(atk > 3 ? 3 : atk, def > 2 ? 2 : def);
      atk -= roll.numAtkDefeated;
      def -= roll.numDefDefeated;
    }
    outcomes.push({
      atkSuccess: atk > 0,
      atkRem: atk,
      defRem: def,
    });
  }

  let atkRemSorted = deepCopy(outcomes).sort((a, b) => a.atkRem - b.atkRem);
  let defRemSorted = deepCopy(outcomes).sort((a, b) => a.defRem - b.defRem);

  return {
    totalSimulations: totalSimulations,
    atk: atkMen,
    def: defMen,
    outcomes: outcomes,
    probAtkSuccess:
      (outcomes.filter((o) => o.atkSuccess).length / totalSimulations) * 100,
    quartiles: quartiles,
    quartilesAtkRem: [
      atkRemSorted[quartiles[0]].atkRem,
      atkRemSorted[quartiles[1]].atkRem,
      atkRemSorted[quartiles[2]].atkRem,
      atkRemSorted[quartiles[3]].atkRem,
      atkRemSorted[quartiles[4]].atkRem,
    ],
    quartilesDefRem: [
      defRemSorted[quartiles[0]].defRem,
      defRemSorted[quartiles[1]].defRem,
      defRemSorted[quartiles[2]].defRem,
      defRemSorted[quartiles[3]].defRem,
      defRemSorted[quartiles[4]].defRem,
    ],
  };
};

function deepCopy<T>(copy: T) {
  return JSON.parse(JSON.stringify(copy)) as T;
}
