import { InlineImage } from "../sdk/CommonComponents";

export type ImageDefinition = {
  relPath: string;
  altText: string;
};

export const ImagePreloader = (props: { images: string[] }) => (
  <div style={{ display: "none" }}>
    {props.images.map((s, i) => (
      <InlineImage key={i} altText="none" relPath={s} />
    ))}
  </div>
);

export const useImageDefinitions = () => {
  const imageDefinitions = {
    Roll: {
      relPath: "Roll.png",
      altText: "",
    },
    RollAll: {
      relPath: "RollAll.png",
      altText: "",
    },
    RiskDiceSimulator: {
      relPath: "RiskDiceSimulator.png",
      altText: "",
    },
    WilliamASease: {
      relPath: "WilliamASease.png",
      altText: "",
    },
    Fight: {
      relPath: "Fight.png",
      altText: "",
    },
    CombatLog: {
      relPath: "CombatLog.png",
      altText: "",
    },
    ArmySize: {
      relPath: "ArmySize.png",
      altText: "",
    },
    Analysis: {
      relPath: "Analysis.png",
      altText: "",
    },
    atk1: {
      relPath: "atk1.png",
      altText: "",
    },
    atk2: {
      relPath: "atk2.png",
      altText: "",
    },
    atk3: {
      relPath: "atk3.png",
      altText: "",
    },
    atk4: {
      relPath: "atk4.png",
      altText: "",
    },
    atk5: {
      relPath: "atk5.png",
      altText: "",
    },
    atk6: { relPath: "atk6.png", altText: "" },
    def1: {
      relPath: "def1.png",
      altText: "",
    },
    def2: {
      relPath: "def2.png",
      altText: "",
    },
    def3: {
      relPath: "def3.png",
      altText: "",
    },
    def4: {
      relPath: "def4.png",
      altText: "",
    },
    def5: {
      relPath: "def5.png",
      altText: "",
    },
    def6: { relPath: "def6.png", altText: "" },
  };

  return {
    imageDefinitions: imageDefinitions,
    relPathsForPreload: Object.entries(imageDefinitions).map(
      ([v, i]) => i.relPath
    ),
  };
};
