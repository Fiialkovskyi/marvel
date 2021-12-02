import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import {useParams} from 'react-router-dom';
import Spinner from "./../spinner/Spinner";
import ErrorMessage from "./../errorMessage/ErrorMessage";
import {Helmet} from "react-helmet";


import './charDetailsPage.scss';


const CharDetailsPage = () => {
  const [char, setChar] = useState(null);
  const {loading, error, getCharacter, clearError} = useMarvelService();
  const {charId} = useParams();

  useEffect(() => {
    clearError();
    getCharacter(charId).then(res => setChar(res));
  }, [charId])


  return (
    <>
    <Helmet>
      <meta
        name="description"
        content={`${char ? char.name : 'Information about comics character'}`}
      />
      <title>{`${char ? char.name : 'Information about comics character'}`}</title>
    </Helmet>
      {
        char ? (
          <div className="single-char">
          <img src={char.thumbnail} alt={char.name} className="single-char__img" />
          <div className="single-char__info">
            <h2 className="single-char__name">{char.name}</h2>
            <p className="single-char__descr">{char.description}</p>
          </div>
        </div>
        ) : loading ? <Spinner /> : <ErrorMessage/>
      }
    </>

  );
};

export default CharDetailsPage;
