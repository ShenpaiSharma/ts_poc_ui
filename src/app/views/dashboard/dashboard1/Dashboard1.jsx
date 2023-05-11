import { Breadcrumb } from "@gull";


const Dashboard1 = () => {
 

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Version 1" },
        ]}
      ></Breadcrumb>
      
    </div>
  );
};

export default Dashboard1;
