import "./comicDetailsPage.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMarvelService from "./../../services/MarvelService";
import Spinner from "./../spinner/Spinner";
import ErrorMessage from "./../errorMessage/ErrorMessage";

const ComicDetailsPage = () => {
  const [comic, setComic] = useState(null);
  const { comicId } = useParams();

  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    clearError();
    getComic(comicId).then((res) => setComic(res));
  }, [comicId]);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  console.log(comic);
  return (
    <div className="single-comic">
      <img
        src={comic.thumbnail}
        alt={comic.name}
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.name}</h2>
        <p className="single-comic__descr">Description: {comic.description}</p>
        <p className="single-comic__descr">Pages: {comic.pageCount}</p>
        <p className="single-comic__descr">Language: {comic.language}</p>
        <div className="single-comic__price">{comic.price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default ComicDetailsPage;
