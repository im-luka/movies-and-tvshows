import React, { useState, useEffect } from "react";
import "./movie-list.scss";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category } from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }

      const data = response.results.filter((elem) => elem.id !== 125910);
      setItems(data);
    };

    getList();
  }, [props.category, props.id, props.type]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {item.id !== 125910 && (
              <MovieCard item={item} category={props.category} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
