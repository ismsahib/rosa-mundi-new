import React, { ChangeEvent, useEffect, useState } from "react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { fetchGetSearch } from "@root/api";
import Card from "@root/components/Card/Card";
import CardNotFound from "@root/components/Card/CardNotFound";
import Error from "@root/components/Error/Error";
import Loader from "@root/components/Loader/Loader";
import Template from "@root/components/Template/Template";
import Title from "@root/components/Title/Title";
import ToggleButton from "@root/components/ToggleButton/ToggleButton";
import { SearchData } from "@root/types/search";

import styles from "./styles.m.scss";

const Search = () => {
  const [data, setData] = useState<SearchData | "loading" | "error">("loading");
  const [loader, setLoader] = useState(true);
  const [checked, setChecked] = useState<"author" | "materials">("author");
  const [searchValue, setSearchValue] = useState("");

  const handleClickChecked = (value: "author" | "materials") => {
    setChecked(value);
    setSearchValue("");
  };
  const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoader(true);
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    if (!searchValue) return;
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    (async () => {
      try {
        const response = await fetchGetSearch(checked === "author" ? 0 : 1, searchValue);
        setData(response);
      } catch (error) {
        setData("error");
      }
    })();

    return () => clearTimeout(timer);
  }, [searchValue, checked]);
  return (
    <Template backgroundImage="search" footer={true} headerColor={false} header={true}>
      <Title black={false} title="ROSAMUNDI" subtitle="SEA_RCH" />
      <div className={styles.searchModule}>
        <div className={styles.searchToggle}>
          <ToggleButton checked={checked === "author"} id="author" cb={() => handleClickChecked("author")} />
          <div className={styles.searchVariants}>Автор / Материал</div>
          <ToggleButton checked={checked === "materials"} id="materials" cb={() => handleClickChecked("materials")} />
        </div>
        <div className={styles.searchInput}>
          <input
            placeholder="Введите наименование искомого "
            onChange={searchOnChange}
            value={searchValue}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Введите наименование искомого ")}
          />
        </div>
      </div>
      <div className={styles.sliderModule}>
        {(data === "loading" || loader) && <Loader />}
        {data === "error" && !loader && <Error black={false} />}
        {data !== "error" && data !== "loading" && !loader && (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={2}
            coverflowEffect={{
              rotate: 0,
              stretch: 100,
              depth: 100,
              modifier: 2,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={styles.swiperContainer}
          >
            {data.length === 0 && (
              <SwiperSlide className={styles.sliderContainer}>
                <CardNotFound />
              </SwiperSlide>
            )}
            {data.length > 0 &&
              data.map((card) => (
                <SwiperSlide className={styles.sliderContainer} key={card.id}>
                  <Card data={card} />
                </SwiperSlide>
              ))}

            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow"></div>
              <div className="swiper-button-next slider-arrow"></div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        )}
      </div>
    </Template>
  );
};

export default Search;
