import React, { useCallback, useEffect, useState } from "react";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import { useNavigate, useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

const MovieGrid = (props) => {
  const { keyword } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, {
              params,
            });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [keyword, props.category]);

  const loadmoreHandler = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, {
            params,
          });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard key={index} category={props.category} item={item} />
        ))}
      </div>
      {page < totalPage && (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadmoreHandler}>
            Load more
          </OutlineButton>
        </div>
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigator = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword || "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigator(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, navigator, props.category]);

  useEffect(() => {
    const enterEvent = (event) => {
      event.preventDefault();

      if (event.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);

    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword..."
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
