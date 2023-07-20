import "./CupSizes.css";

import LCup from "/Large-Cup.svg";
import MCup from "/Medium-Cup.svg";
import SCup from "/Small-Cup.svg";
import { Size } from "../types";

export function Cup(props: { active?: boolean; size: Size }) {
  const determineSize = () => {
    switch (props.size) {
      case Size.Tall:
        return SCup;
      case Size.Grande:
        return MCup;
      case Size.Venti:
        return LCup;
      default:
        return undefined;
    }
  };

  return (
    <img
      src={determineSize()}
      alt={`${props.size} Cup`}
      className={`cupSizes ${props.active ? "active" : ""} dark:fill-white`}
    />
  );
}

export function SmallCup(props: { active?: boolean }) {
  return (
    <img
      src={SCup}
      alt="Small Cup"
      className={`cupSizes ${props.active ? "color-green" : ""}`}
    />
  );
}

export function MediumCup(props: { active?: boolean }) {
  return (
    <img
      src={MCup}
      alt="Medium Cup"
      className={`cupSizes ${props.active ? "color-green" : ""}`}
    />
  );
}

export function LargeCup(props: { active?: boolean }) {
  return (
    <img
      src={LCup}
      alt="Large Cup"
      className={`cupSizes ${props.active ? "color-green" : ""}`}
    />
  );
}
