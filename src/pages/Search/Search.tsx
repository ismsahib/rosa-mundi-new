import React, { ChangeEvent, useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import NotFound from "../NotFound/NotFound";
import { fetchGetSearch } from "@root/api";
import Loader from "@root/components/Loader/Loader";
import Slider from "@root/components/Slider/Slider";
import Template from "@root/components/Template/Template";
import Title from "@root/components/Title/Title";
import ToggleButton from "@root/components/ToggleButton/ToggleButton";
import { SearchData } from "@root/types/search";

import styles from "./styles.m.scss";

const Search = () => {
  const [data, setData] = useState<SearchData | "init" | "error">("init");
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState<"author" | "materials">("author");
  const [searchValue, setSearchValue] = useState("");

  const handleClickChecked = (value: "author" | "materials") => {
    setChecked(value);
  };
  const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoader(true);
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const jsonData = localStorage.getItem("data");

    if (jsonData) {
      const data = JSON.parse(jsonData) as { checked: "author" | "materials"; searchValue: string };
      setSearchValue(data.searchValue);
      setChecked(data.checked);
    }
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setLoader(false);
      return;
    }

    localStorage.setItem("data", JSON.stringify({ checked, searchValue }));

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
    <>
      {data === "error" && <NotFound />}
      {data !== "error" && data !== "init" && (
        <Template backgroundImage="search" footer={true} headerColor={false} header={true}>
          <Title black={false} title="ROSAMUNDI" subtitle="SEA_RCH" />
          <div className={styles.searchModule}>
            <div className={styles.searchToggle}>
              <ToggleButton checked={checked === "author"} id="author" cb={() => handleClickChecked("author")} />
              <div className={styles.searchVariants}>Автор / Материал</div>
              <ToggleButton
                checked={checked === "materials"}
                id="materials"
                cb={() => handleClickChecked("materials")}
              />
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
            {loader && <Loader />}
            {!loader && !!searchValue && <Slider data={data} />}
          </div>
        </Template>
      )}
    </>
  );
};

export default Search;
