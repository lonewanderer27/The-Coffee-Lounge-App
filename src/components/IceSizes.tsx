import "./IceSizes.css";

import ExtraIce from "/IceSizes/Extra Ice.svg";
import { Ice as IceAmounts } from "../types";
import LightIce from "/IceSizes/Light Ice.svg";
import NormalIce from "/IceSizes/Normal Ice.svg";

export function IceSize(props: { active?: boolean; amount: IceAmounts }) {
  const determineSize = () => {
    switch (props.amount) {
      case IceAmounts.Light:
        return LightIce;
      case IceAmounts.Normal:
        return NormalIce;
      case IceAmounts.Extra:
        return ExtraIce;
    }
  };

  return (
    <img
      src={determineSize()}
      alt="Ice"
      className={`iceSizes ${props.active ? "color-green" : ""}`}
    />
  );
}
