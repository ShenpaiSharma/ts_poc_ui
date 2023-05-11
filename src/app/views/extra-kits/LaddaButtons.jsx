import { useState } from "react";
import { Breadcrumb, SimpleCard } from "@gull";
import LaddaButton, {
  XL,
  EXPAND_LEFT,
  EXPAND_RIGHT,
  EXPAND_UP,
  EXPAND_DOWN,
  CONTRACT,
  SLIDE_LEFT,
  SLIDE_RIGHT,
  SLIDE_UP,
  SLIDE_DOWN,
  ZOOM_IN,
  ZOOM_OUT,
} from "react-ladda";

const LaddaButtons = () => {
  const [state, setState] = useState({
    expLeft: false,
    expRight: false,
    expUp: false,
    expDown: false,
    expContract: false,
    expOverlay: false,
    expSlideLeft: false,
    expSlideRight: false,
    expSlideUp: false,
    expSlideDown: false,
    expZoomIn: false,
    expZoomOut: false,
  });

  const spinnerStyle = [
    EXPAND_LEFT,
    EXPAND_RIGHT,
    EXPAND_UP,
    EXPAND_DOWN,
    CONTRACT,
    SLIDE_LEFT,
    SLIDE_RIGHT,
    SLIDE_UP,
    SLIDE_DOWN,
    ZOOM_IN,
    ZOOM_OUT,
  ];

  const varianList = ["primary", "success", "warning", "info", "danger"];

  const toggle = (name) => {
    setState((prevState) => ({
      ...prevState,
      [name]: !state[name],
    }));
  };

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Extra Kits", path: "/extra-kits" },
          { name: "Ladda Buttons" },
        ]}
      />
      <SimpleCard title="basic example" className="mb-4">
        {Object.keys(state).map((key, i) => (
          <LaddaButton
            key={i}
            className={`btn btn-${
              varianList[i % 5]
            } border-0 me-2 mb-2 position-relative`}
            loading={state[key]}
            progress={0.5}
            onClick={() => toggle(key)}
            data-style={spinnerStyle[i]}
          >
            Submit
          </LaddaButton>
        ))}
      </SimpleCard>

      <SimpleCard title="defferent size" className="mb-4">
        <p>Small Ladda Button</p>
        {Object.keys(state).map((key, i) => (
          <LaddaButton
            key={i}
            className={`btn btn-${varianList[i % 5]} 
              border-0 me-2 mb-2 btn-sm position-relative`}
            loading={state[key]}
            onClick={() => toggle(key)}
            data-style={spinnerStyle[i]}
          >
            Submit
          </LaddaButton>
        ))}

        <p>Large Ladda Button</p>
        {Object.keys(state).map((key, i) => (
          <LaddaButton
            key={i}
            className={`btn btn-${varianList[i % 5]} 
              border-0 me-2 mb-2 btn-lg position-relative`}
            loading={state[key]}
            onClick={() => toggle(key)}
            data-style={spinnerStyle[i]}
          >
            Submit
          </LaddaButton>
        ))}
      </SimpleCard>
    </div>
  );
};

export default LaddaButtons;
