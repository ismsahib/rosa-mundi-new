import React, { FC } from "react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Card from "../Card/Card";
import CardNotFound from "../Card/CardNotFound";
import Icon from "../Icon/Icon";
import { SearchData } from "@root/types/search";

import "./slyderStyles.scss";

const Slider: FC<{ data: SearchData }> = ({ data }) => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 175,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true, dynamicBullets: true}}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {data.length === 0 && (
          <SwiperSlide className="swiper_slidercontainer">
            <CardNotFound />
          </SwiperSlide>
        )}
        {data.length > 0 &&
          data.map((card) => (
            <SwiperSlide key={card.id} className="swiper_slidercontainer">
              <Card data={card} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="paginationWrapper">
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <Icon name="prev" />
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next slider-arrow">
            <Icon name="next" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
