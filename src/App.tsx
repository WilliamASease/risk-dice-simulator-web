import "./App.css";
import {
  Anchor,
  FlexBox,
  InlineImage,
  SiteBody,
  SiteHorizontalRule,
  SiteText,
} from "./sdk/CommonComponents";
import { isMobile } from "react-device-detect";
import { ImagePreloader, useImageDefinitions } from "./data/ImageDefinitions";
import { useCallback, useEffect, useRef, useState } from "react";
import { battle, logRoll } from "./util/math";
import { MessageLogType, RollType } from "./types/types";

function App() {
  const { imageDefinitions, relPathsForPreload, getDie } =
    useImageDefinitions();

  const blackBorder = { border: "solid black 5px" };
  const diceStyle = {
    height: isMobile ? "50%" : undefined,
    border: isMobile ? "solid black 2px" : "solid black 5px",
    borderRadius: isMobile ? 5 : 25,
  };
  const diceRowStyle = {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  };
  const blackBorder2 = { border: "solid black 2px" };

  const [atkMen, setAtkMen] = useState<number | null>(1);
  const [defMen, setDefMen] = useState<number | null>(1);
  const [battleRunning, setBattleRunning] = useState(false);
  const [rollDisplay, setRollDisplay] = useState<RollType | null>(null);
  const [messageLog, setMessageLog] = useState<MessageLogType[]>([]);
  const messageLogRef = useRef<HTMLDivElement>(null);
  const appendMessage = useCallback(
    (msg: MessageLogType) => {
      setMessageLog(messageLog.concat([msg]));
    },
    [messageLog, setMessageLog]
  );

  useEffect(() => {
    setTimeout(() => {
      if (messageLogRef !== null) {
        messageLogRef.current?.scrollTo({
          behavior: "smooth",
          top: messageLogRef.current.scrollHeight + 50,
        });
      }
    }, 100);
  }, [messageLogRef.current, messageLog]);

  useEffect(
    () => appendMessage([{ color: "black", value: "Welcome to RISK!" }]),
    []
  );

  const reportIfVictory = useCallback(
    (atkLost: number, defLost: number) => {
      const trueAtk = (atkMen ?? 0) - atkLost;
      const trueDef = (defMen ?? 0) - defLost;
      if (trueAtk === 0) {
        return [
          {
            color: "blue" as "blue",
            value: `BLUE WINS! Keeps ${trueDef} in this territory.`,
          },
        ];
      } else if (trueDef === 0) {
        return [
          {
            color: "red" as "red",
            value: `RED WINS! Has ${trueAtk} to move into this territory with.`,
          },
        ];
      }
      return [];
    },
    [atkMen, defMen]
  );

  useEffect(() => {
    if (atkMen === 0 || defMen === 0) {
      setBattleRunning(false);
    } else if (!(atkMen === null) && !(defMen === null) && battleRunning) {
      const roll = battle(atkMen > 3 ? 3 : atkMen, defMen > 2 ? 2 : defMen);
      setRollDisplay(roll);
      const possVictory = reportIfVictory(
        roll.numAtkDefeated,
        roll.numDefDefeated
      );
      appendMessage([...logRoll(roll), ...possVictory]);
      setTimeout(() => {
        setAtkMen(atkMen - roll.numAtkDefeated);
        setDefMen(defMen - roll.numDefDefeated);
      }, 100);
    }
  }, [battleRunning, atkMen, defMen, reportIfVictory]);

  return (
    <FlexBox
      orientation="column"
      style={{
        backgroundColor: "lightgrey",
        alignItems: "center",
        minHeight: "100%",
      }}
      fullWidth
    >
      <FlexBox
        orientation="column"
        style={{
          width: isMobile ? "90%" : 1000,
          flexGrow: 1,
          backgroundColor: "white",
          marginLeft: isMobile ? 5 : undefined,
          marginRight: isMobile ? 5 : undefined,
          paddingLeft: 5,
          paddingRight: 5,
          height: "100%",
        }}
      >
        <ImagePreloader images={relPathsForPreload} />
        <FlexBox style={{ marginTop: ".5rem" }} orientation="row">
          <InlineImage noDiv {...imageDefinitions.RiskDiceSimulator} />
        </FlexBox>
        <SiteHorizontalRule />
        <SiteBody>
          <FlexBox style={{ height: "50%", ...blackBorder2 }} orientation="row">
            <FlexBox
              style={{ width: "50%", ...blackBorder2 }}
              orientation="column"
            >
              <InlineImage
                style={{ width: "100%" }}
                {...imageDefinitions.Fight}
              />
              <FlexBox style={{ flexGrow: 1 }} orientation={"column"}>
                <FlexBox fullWidth orientation="row" style={diceRowStyle}>
                  {rollDisplay &&
                    rollDisplay.atk.map((dt) => (
                      <InlineImage
                        style={diceStyle}
                        noDiv
                        {...getDie("atk", dt.value)}
                      />
                    ))}
                </FlexBox>
                <FlexBox fullWidth orientation="row" style={diceRowStyle}>
                  {rollDisplay &&
                    rollDisplay.def.map((dt) => (
                      <InlineImage
                        style={diceStyle}
                        noDiv
                        {...getDie("def", dt.value)}
                      />
                    ))}
                </FlexBox>
              </FlexBox>
              <InlineImage
                onClick={() => {
                  if (atkMen === 0) {
                    appendMessage([
                      { color: "black", value: "There are no attackers!" },
                    ]);
                  } else if (defMen === 0) {
                    appendMessage([
                      { color: "black", value: "There are no defenders!" },
                    ]);
                  } else if (!(atkMen === null) && !(defMen === null)) {
                    const roll = battle(
                      atkMen > 3 ? 3 : atkMen,
                      defMen > 2 ? 2 : defMen
                    );
                    setRollDisplay(roll);
                    setAtkMen(atkMen - roll.numAtkDefeated);
                    setDefMen(defMen - roll.numDefDefeated);
                    const possVictory = reportIfVictory(
                      roll.numAtkDefeated,
                      roll.numDefDefeated
                    );
                    appendMessage([...logRoll(roll), ...possVictory]);
                  }
                }}
                style={{ width: isMobile ? "90%" : "50%", ...blackBorder }}
                {...imageDefinitions.Roll}
              />
              <InlineImage
                style={{ width: isMobile ? "90%" : "50%", ...blackBorder }}
                {...imageDefinitions.RollAll}
                onClick={() => {
                  if (atkMen === 0) {
                    appendMessage([
                      { color: "black", value: "There are no attackers!" },
                    ]);
                  } else if (defMen === 0) {
                    appendMessage([
                      { color: "black", value: "There are no defenders!" },
                    ]);
                  } else if (!(atkMen === null) && !(defMen === null)) {
                    setBattleRunning(true);
                  }
                }}
              />
            </FlexBox>
            <FlexBox
              style={{ width: "50%", ...blackBorder2 }}
              orientation="column"
            >
              <InlineImage
                style={{ width: "100%" }}
                {...imageDefinitions.CombatLog}
              />
              <div
                style={{ flexGrow: 1, overflowY: "scroll", padding: ".5rem" }}
                ref={messageLogRef}
              >
                {messageLog.map((msg) => (
                  <FlexBox orientation="row">
                    {msg.map((section) => (
                      <span
                        style={{
                          marginRight: ".5rem",
                          color: section.color,
                          textDecorationLine: section.strike
                            ? "line-through"
                            : undefined,
                        }}
                      >
                        {section.value}
                      </span>
                    ))}
                  </FlexBox>
                ))}
              </div>
            </FlexBox>
          </FlexBox>
          <FlexBox style={{ height: "50%", ...blackBorder2 }} orientation="row">
            <FlexBox
              style={{ width: "50%", ...blackBorder2 }}
              orientation="column"
            >
              <InlineImage
                style={{ width: "100%" }}
                {...imageDefinitions.ArmySize}
              />
              <FlexBox style={{ flexGrow: 1 }} orientation="column">
                <FlexBox style={{ height: "50%" }} orientation="row">
                  <span
                    style={{
                      width: "50%",
                      fontSize: "3rem",
                      color: "red",
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                  >
                    ATK
                  </span>
                  <input
                    disabled={battleRunning}
                    style={{
                      width: "50%",
                      fontSize: "3rem",
                      color: "red",
                      textAlign: "center",
                    }}
                    onChange={(e) => {
                      const newNum = parseInt(e.target.value);
                      if (e.target.value === "") {
                        setAtkMen(null);
                      } else if (!isNaN(newNum)) {
                        setAtkMen(parseInt(e.target.value));
                      }
                    }}
                    value={atkMen ?? ""}
                  />
                </FlexBox>
                <FlexBox style={{ height: "50%" }} orientation="row">
                  <span
                    style={{
                      width: "50%",
                      fontSize: "3rem",
                      color: "blue",
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                  >
                    DEF
                  </span>
                  <input
                    disabled={battleRunning}
                    style={{
                      width: "50%",
                      fontSize: "3rem",
                      color: "blue",
                      textAlign: "center",
                    }}
                    onChange={(e) => {
                      const newNum = parseInt(e.target.value);
                      if (e.target.value === "") {
                        setDefMen(null);
                      }
                      if (!isNaN(newNum)) {
                        setDefMen(parseInt(e.target.value));
                      }
                    }}
                    value={defMen ?? ""}
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>
            <FlexBox
              style={{ width: "50%", ...blackBorder2 }}
              orientation="column"
            >
              <InlineImage
                style={{ width: "100%" }}
                {...imageDefinitions.Analysis}
              />
            </FlexBox>
          </FlexBox>
        </SiteBody>
        <SiteHorizontalRule />
        <Anchor link="https://williamasease.github.io">
          <InlineImage
            style={{ width: isMobile ? "100%" : undefined }}
            {...imageDefinitions.WilliamASease}
          />
        </Anchor>
      </FlexBox>
    </FlexBox>
  );
}

export default App;
