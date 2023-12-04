import { Carousel } from "flowbite-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerCard from "../../components/BannerCard";
export default function Banner() {
  const url = [
    {
      url: "http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/slider03.jpg",
    },
    {
      url: "http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/slider02.jpg",
    },
    {
      url: "http://anhvan.giaodienwebmau.com/wp-content/uploads/2018/03/slider2.png",
    },
  ];
  return (
    <div className="h-[120px] sm:h-64 xl:h-340 2xl:h-510">
      <Carousel slideInterval={4000} className=" relative">
        {url.map((url, index) => (
          <BannerCard url={url.url} key={index} title="" />
        ))}
      </Carousel>
    </div>
  );
}
