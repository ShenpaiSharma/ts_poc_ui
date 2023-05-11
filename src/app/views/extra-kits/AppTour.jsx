import Tour from "reactour";
import { Breadcrumb } from "@gull";
import { Button } from "react-bootstrap";
import { useState } from "react";

const AppTour = () => {
  const [state, setState] = useState({
    isTourOpen: false,
    steps: [
      {
        selector: "#customizer",
        content: "Click here to change layout, color etc",
      },
      {
        selector: "#buy-gull",
        content: "Click here to buy Gull React",
      },
    ],
  });

  const toggleTour = () => {
    setState((prevState) => ({ ...prevState, isTourOpen: !state.isTourOpen }));
  };

  let { steps, isTourOpen } = state;

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Extra Kits", path: "/extra-kits" },
          { name: "User Tour" },
        ]}
      />
      <Button onClick={toggleTour}>Start Tour</Button>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={toggleTour}
        rounded={8}
        className="react-tour"
        accentColor="#7f4fb3"
        // prevButton={<Button size="sm">prev</Button>}
        // nextButton={<Button size="sm">next</Button>}
      />
    </div>
  );
};

export default AppTour;
