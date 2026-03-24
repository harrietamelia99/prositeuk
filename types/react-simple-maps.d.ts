declare module "react-simple-maps" {
  import { ReactNode, SVGProps, MouseEvent } from "react";

  export interface ProjectionConfig {
    center?: [number, number];
    scale?: number;
    rotate?: [number, number, number];
  }

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
  }
  export function ComposableMap(props: ComposableMapProps): JSX.Element;

  export interface GeographiesProps {
    geography: string | object;
    children: (args: { geographies: GeoFeature[] }) => ReactNode;
  }
  export function Geographies(props: GeographiesProps): JSX.Element;

  export interface GeoFeature {
    rsmKey: string;
    id: string;
    properties: Record<string, unknown>;
    [key: string]: unknown;
  }

  export interface GeographyStyle {
    default?: React.CSSProperties;
    hover?: React.CSSProperties;
    pressed?: React.CSSProperties;
  }
  export interface GeographyProps {
    geography: GeoFeature;
    style?: GeographyStyle;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
  }
  export function Geography(props: GeographyProps): JSX.Element;

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    onClick?: (e: MouseEvent) => void;
  }
  export function Marker(props: MarkerProps): JSX.Element;
}
