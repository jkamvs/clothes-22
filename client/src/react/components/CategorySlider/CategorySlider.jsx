import React from "react";
import Slider from "./Slider/Slider";

function CategorySlider() {
  let arr = [
    {
      name: "Women",
      img: [
        "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw0bdf18a6/1_front_750/00451661-01.jpg",
        "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw260e4330/2_side_750/00451661-01.jpg",
        "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwb0207f4e/3_back_750/00451661-01.jpg",
        "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwad82935d/4_full_750/00451661-01.jpg",
      ],
    },
    {
      name: "Men",
      img: [
        "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
        "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw334da0a7/2_side_750/00459086-01.jpg",
        "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwa54a165f/3_back_750/00459086-01.jpg",
        "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw26f980c0/4_full_750/00459086-01.jpg",
      ],
    },
  ];
  console.log(arr[0]);
  return (
    <div>
      {arr?.map((e) => {
        return <Slider key={e.name} category={e} />;
      })}
    </div>
  );
}

export default CategorySlider;
