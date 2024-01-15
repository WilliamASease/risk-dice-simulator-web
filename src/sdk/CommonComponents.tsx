import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useImageDefinitions } from "../data/ImageDefinitions";
import React from "react";

export const SiteText = (props: {
  value: string;
  big?: boolean;
  bold?: boolean;
  underline?: boolean;
  indent?: boolean;
  labelFor?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) => (
  <div
    style={{
      fontWeight: props.bold ? "bold" : "unset",
      textDecoration: props.underline ? "underline" : undefined,
      textIndent: props.indent ? 50 : 0,
      fontSize: props.big ? "larger" : undefined,
      ...props.style,
    }}
    onClick={props.onClick}
  >
    {props.value}
  </div>
);

export const SiteSpacer = () => <div style={{ height: "1rem" }}></div>;

type FlexBoxProps = {
  orientation: "row" | "column";
  fullHeight?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  children: ReactNode;
};

export const FlexBox = (props: FlexBoxProps) => (
  <div
    style={{
      display: "flex",
      height: props.fullHeight ? "100%" : undefined,
      width: props.fullWidth ? "100%" : undefined,
      flexDirection: props.orientation,
      ...props.style,
    }}
  >
    {props.children}
  </div>
);

export const InlineImage = (props: {
  relPath: string;
  altText: string;
  noDiv?: boolean;
  caption?: string;
  style?: React.CSSProperties;
}) => {
  const coreImg = (
    <img
      src={`https://williamasease.github.io/risk-dice-simulator-web/build/images/${props.relPath}`}
      alt={props.altText}
      style={{ ...props.style }}
    />
  );

  const img = props.caption ? (
    <span style={{ display: "flex", flexDirection: "column" }}>
      {coreImg}
      {props.caption && <span>{props.caption}</span>}
    </span>
  ) : (
    coreImg
  );
  return <div>{img}</div>;
};

export const InlineLink = (props: { relPath: string; text: string }) => (
  <Anchor
    link={`https://williamasease.github.io/risk-dice-simulator-web/build/${props.relPath}`}
  >
    {props.text}
  </Anchor>
);

export const Anchor = (props: {
  children: ReactNode;
  link: string;
  noDiv?: boolean;
  style?: React.CSSProperties;
}) => {
  const { children, link, noDiv, style } = props;
  const anchor = (
    <a style={style} href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
  return noDiv ? anchor : <div>{anchor}</div>;
};

export const SiteHorizontalRule = () => <hr style={{ width: "100%" }} />;

export const SiteBody = (props: { children?: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState([0, 0]);
  const [clock, setClock] = useState(0);
  useEffect(() => {
    setDimensions([
      ref.current?.clientHeight ?? 0,
      ref.current?.clientWidth ?? 0,
    ]);
    setTimeout(() => setClock((prev) => prev + 1), 200);
  }, [clock]);

  return (
    <div style={{ flexGrow: 1 }} ref={ref}>
      <div
        style={{
          height: dimensions[0],
          position: "absolute",
          overflowY: "scroll",
        }}
      >
        <div style={{ width: (dimensions[1] ?? 0) - 12 }}>{props.children}</div>
      </div>
    </div>
  );
};

export const SiteGutterLayout = (props: {
  children: [ReactElement, ReactElement];
}) => {
  return (
    <FlexBox orientation="row">
      <FlexBox orientation="column" style={{ marginRight: "2rem" }}>
        {props.children[0]}
      </FlexBox>
      <FlexBox orientation="column" style={{ flexGrow: 1 }}>
        {props.children[1]}
      </FlexBox>
    </FlexBox>
  );
};
