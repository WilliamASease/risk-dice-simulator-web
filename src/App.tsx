import "./App.css";
import {
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
          <SiteText
            style={{ flexGrow: 1 }}
            big
            bold
            value="Risk Dice Simulator"
          />
        </FlexBox>
        <SiteHorizontalRule />
        <SiteBody>
          <InlineImage {...imageDefinitions.atk1} />
          <InlineImage {...imageDefinitions.atk2} />
          <InlineImage {...imageDefinitions.atk3} />
          <InlineImage {...imageDefinitions.atk4} />
          <InlineImage {...imageDefinitions.atk5} />
          <InlineImage {...imageDefinitions.atk6} />
          <InlineImage {...imageDefinitions.def1} />
          <InlineImage {...imageDefinitions.def2} />
          <InlineImage {...imageDefinitions.def3} />
          <InlineImage {...imageDefinitions.def4} />
          <InlineImage {...imageDefinitions.def5} />
          <InlineImage {...imageDefinitions.def6} />
          <InlineImage {...imageDefinitions.Analyze} />
          <InlineImage {...imageDefinitions.Roll} />
          <InlineImage {...imageDefinitions.RollAll} />
        </SiteBody>
        <SiteHorizontalRule />
      </FlexBox>
    </FlexBox>
  );
}

export default App;
