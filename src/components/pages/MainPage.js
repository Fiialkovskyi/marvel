import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import SearchForm from "./../searchForm/SearchForm";
import { Helmet } from "react-helmet";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelect = (id) => {
    setSelectedChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="List of Marvels characters" />
        <title>Characters</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>

      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelect={onCharSelect} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <SearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
