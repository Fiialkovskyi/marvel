import { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import "./charList.scss";

const CharList = ({ onCharSelect }) => {
  const [newCharsLoading, setNewCharsLoading] = useState(false);
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(210);
  const [charsEnded, setCharsEnded] = useState(false);

  useEffect(() => {
    loadCharacters(offset, true);
  }, []);

  const { loading, error, getAllCharacters } = useMarvelService();

  const onCharListLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars((chars) => [...chars, ...newChars]);
    setNewCharsLoading(false);
    setOffset((offset) => offset + 9);
    setCharsEnded(ended);
  };

  const loadCharacters = (offset, initialLoading) => {
    initialLoading ? setNewCharsLoading(false) : setNewCharsLoading(true);

    getAllCharacters(offset).then((res) => onCharListLoaded(res));
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  return (
    <div className="char__list">
      {loading && !newCharsLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <ul className="char__grid">
          <TransitionGroup component={null}>
            {chars.map((char, index) => {
              const { name, thumbnail, id } = char;
              const objectPositionStyle =
                thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                  ? "center left"
                  : "center";
              return (
                <CSSTransition key={id} classNames="char__item" timeout={500}>
                  <li
                    className="char__item"
                    tabIndex={0}
                    onClick={() => {
                      onCharSelect(id);
                      focusOnItem(index);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        onCharSelect(char.id);
                        focusOnItem(index);
                      }
                    }}
                    ref={(el) => (itemRefs.current[index] = el)}
                  >
                    <img
                      src={thumbnail}
                      alt={name}
                      style={{ objectPosition: objectPositionStyle }}
                    />
                    <div className="char__name">{name}</div>
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ul>
      )}

      <button
        className="button button__main button__long"
        onClick={() => loadCharacters(offset)}
        disabled={newCharsLoading}
        style={{ display: charsEnded ? "none" : "block" }}
      >
        <div className="inner">
          {newCharsLoading ? "Loading..." : "load more"}
        </div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelect: PropTypes.func.isRequired,
};

export default CharList;
