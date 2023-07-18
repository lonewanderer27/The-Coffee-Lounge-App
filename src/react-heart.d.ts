declare module "react-heart" {
  export interface HeartProps {
    isActive: boolean;
    onClick: () => void;
    animationTrigger: "click" | "hover" | "none" | "both";
    animationScale?: number;
    animationDuration?: number;
    inactiveColor?: string;
    activeColor?: string;
    className?: string;
    style?: React.CSSProperties;
  }

  declare function Heart(props: HeartProps): JSX.Element;
  export default Heart;
}
