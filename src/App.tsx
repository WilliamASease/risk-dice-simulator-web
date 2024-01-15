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
          <div>
            <InlineImage noDiv {...imageDefinitions.atk1} />
            <InlineImage noDiv {...imageDefinitions.atk2} />
            <InlineImage noDiv {...imageDefinitions.atk3} />
            <InlineImage noDiv {...imageDefinitions.atk4} />
            <InlineImage noDiv {...imageDefinitions.atk5} />
            <InlineImage noDiv {...imageDefinitions.atk6} />
          </div>
          <div>
            <InlineImage noDiv {...imageDefinitions.def1} />
            <InlineImage noDiv {...imageDefinitions.def2} />
            <InlineImage noDiv {...imageDefinitions.def3} />
            <InlineImage noDiv {...imageDefinitions.def4} />
            <InlineImage noDiv {...imageDefinitions.def5} />
            <InlineImage noDiv {...imageDefinitions.def6} />
          </div>
          <InlineImage {...imageDefinitions.Analyze} />
          <InlineImage {...imageDefinitions.Roll} />
          <InlineImage {...imageDefinitions.RollAll} />
        </SiteBody>
        <SiteHorizontalRule />
        <Anchor link="https://williamasease.github.io">
          <InlineImage {...imageDefinitions.WilliamASease} />
        </Anchor>
      </FlexBox>
    </FlexBox>
  );
}

export default App;
