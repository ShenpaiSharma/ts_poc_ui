import RadarChart from "./RadarChart";
import { Breadcrumb, SimpleCard } from "@gull";
import StackedPolarBar from "./StackedPolarBar";
import CircularProgressBar from "./CircularProgressBar";
import VictoryAreaAnimation from "./VictoryAreaAnimation";
import AlternativeEventsChart from "./AlternativeEvents";
import CustomTooltipLableChart from "./CustomTooltipLabelChart";
import { Row, Col } from "react-bootstrap";

const AppVictoryChart = () => {
  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Charts", path: "/charts" },
          { name: "Victory Charts" },
        ]}
      />
      <Row>
        <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
          <SimpleCard className="h-100" title="circular progress bar">
            <CircularProgressBar />
          </SimpleCard>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
          <SimpleCard className="h-100" title="stacked polar bar">
            <StackedPolarBar />
          </SimpleCard>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
          <SimpleCard className="h-100" title="area animation Chart">
            <VictoryAreaAnimation />
          </SimpleCard>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
          <SimpleCard className="h-100" title="victory radar Chart">
            <RadarChart />
          </SimpleCard>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
          <SimpleCard className="h-100" title="alternative events Chart">
            <AlternativeEventsChart />
          </SimpleCard>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
          <SimpleCard className="h-100" title="custom tooltip label">
            <CustomTooltipLableChart />
          </SimpleCard>
        </Col>
      </Row>
    </div>
  );
};

export default AppVictoryChart;
