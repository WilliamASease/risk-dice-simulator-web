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

function App() {
  const { imageDefinitions, relPathsForPreload } = useImageDefinitions();

  const blackBorder = { border: "solid black 5px" };

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
          <FlexBox
            style={{ height: "50%", border: "solid red 1px" }}
            orientation="row"
          >
            <FlexBox
              style={{ width: "50%", border: "solid blue 1px" }}
              orientation="column"
            >
              <InlineImage
                style={{ width: "100%" }}
                {...imageDefinitions.Fight}
              />
              <FlexBox style={{ flexGrow: 1 }} orientation={"column"}>
                <FlexBox fullWidth orientation="row" style={{ height: "50%" }}>
                  <InlineImage noDiv {...imageDefinitions.atk1} />
                  <InlineImage noDiv {...imageDefinitions.atk2} />
                </FlexBox>
                <FlexBox fullWidth orientation="row" style={{ height: "50%" }}>
                  <InlineImage noDiv {...imageDefinitions.def1} />
                  <InlineImage noDiv {...imageDefinitions.def2} />
                  <InlineImage noDiv {...imageDefinitions.def3} />
                </FlexBox>
              </FlexBox>
              <InlineImage
                style={{ width: isMobile ? "100%" : "50%", ...blackBorder }}
                {...imageDefinitions.Roll}
              />
              <InlineImage
                style={{ width: isMobile ? "100%" : "50%", ...blackBorder }}
                {...imageDefinitions.RollAll}
              />
            </FlexBox>
            <FlexBox
              style={{ width: "50%", border: "solid blue 1px" }}
              orientation="column"
            >
              <InlineImage
                style={{ width: "100%" }}
                {...imageDefinitions.CombatLog}
              />
            </FlexBox>
          </FlexBox>
          <FlexBox
            style={{ height: "50%", border: "solid red 1px" }}
            orientation="row"
          >
            <FlexBox
              style={{ width: "50%", border: "solid blue 1px" }}
              orientation="column"
            >
              <InlineImage
                style={{ width: "100%" }}
                {...imageDefinitions.ArmySize}
              />
            </FlexBox>
            <FlexBox
              style={{ width: "50%", border: "solid blue 1px" }}
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
