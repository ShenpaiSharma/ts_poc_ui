import {
  MdStar,
  MdFavorite,
  MdStarBorder,
  MdFavoriteBorder,
} from "react-icons/md";
import { useState } from "react";
import Rating from "react-rating";
import { Breadcrumb, SimpleCard } from "@gull";

const AppRating = () => {
  const [state, setState] = useState({
    rate: 3,
  });

  const handleRatingChange = (rate) => {
    setState({ rate });
  };

  let { rate } = state;

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "UI Kits", path: "/uikits" },
          { name: "Rating" },
        ]}
      />
      <div className="row">
        <div className="col-md-6 mb-3">
          <SimpleCard title="Star Rating">
            <Rating
              initialRating={rate}
              emptySymbol={<MdStarBorder size={22}></MdStarBorder>}
              fullSymbol={<MdStar className="text-warning" size={22}></MdStar>}
              onChange={handleRatingChange}
            ></Rating>
            <div className="mt-3">Rate: {rate}</div>
          </SimpleCard>
        </div>
        <div className="col-md-6 mb-3">
          <SimpleCard title="Heart Rating">
            <Rating
              initialRating={rate}
              start={0}
              stop={7}
              emptySymbol={<MdFavoriteBorder size={22}></MdFavoriteBorder>}
              fullSymbol={
                <MdFavorite className="text-primary" size={22}></MdFavorite>
              }
              onChange={handleRatingChange}
            ></Rating>
            <div className="mt-3">Rate: {rate}</div>
          </SimpleCard>
        </div>
        <div className="col-md-6 mb-3">
          <SimpleCard title="Rating">
            <Rating
              initialRating={rate}
              emptySymbol={<MdStarBorder size={16}></MdStarBorder>}
              fullSymbol={<MdStar className="text-primary" size={16}></MdStar>}
            ></Rating>
            <br />
            <Rating
              initialRating={rate}
              emptySymbol={<MdStarBorder size={22}></MdStarBorder>}
              fullSymbol={<MdStar className="text-warning" size={22}></MdStar>}
            ></Rating>
            <br />
            <Rating
              initialRating={rate}
              emptySymbol={<MdStarBorder size={28}></MdStarBorder>}
              fullSymbol={<MdStar className="text-success" size={28}></MdStar>}
            ></Rating>
          </SimpleCard>
        </div>
        <div className="col-md-6 mb-3">
          <SimpleCard title="Decimal Rating">
            <Rating
              initialRating={rate}
              fractions={2}
              emptySymbol={<MdFavoriteBorder size={22}></MdFavoriteBorder>}
              fullSymbol={
                <MdFavorite className="text-primary" size={22}></MdFavorite>
              }
              onChange={handleRatingChange}
            ></Rating>
            <div className="mt-3">Rate: {rate}</div>
          </SimpleCard>
        </div>
      </div>
    </div>
  );
};

export default AppRating;
