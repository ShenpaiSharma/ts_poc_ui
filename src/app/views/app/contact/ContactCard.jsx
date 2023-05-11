import { Breadcrumb } from "@gull";

const ContactCard = () => {
  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
          { name: "Contact Card" },
        ]}
      />
    </div>
  );
};

export default ContactCard;
