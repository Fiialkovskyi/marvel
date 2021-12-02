import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import useMarvelService from "../../services/MarvelService";

import "./searchFrom.scss";
import { useState } from "react";
import { Link } from 'react-router-dom';

const SearchForm = () => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  let schema = yup.object({
    name: yup
      .string()
      .required("Required field!")
      .min(2, "At least 2 characters"),
  });

  const onSubmit = ({ name }) => {
    clearError();
    getCharacterByName(name).then((data) => setChar(data));
  };

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <Form>
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field id="name" name="name" placeholder="Enter name" />
            <button
              type="submit"
              className="button button__main"
              disabled={loading}
            >
              <div className="inner">{loading ? "loading" : "find"}</div>
            </button>
          </div>
          <ErrorMessage
            component="div"
            className="char__search-error"
            name="name"
          />
        </Form>
      </Formik>
      {!char ? null : !char.length ? (
        <div className="char__search-error">
          The character was not found. Check the name and try again
        </div>
      ) : (
        <div className="char__search-wrapper">
          <div className="char__search-success">
            There is! Visit {char[0].name} page?
          </div>
          <Link
            to={`/characters/${char[0].id}`}
            className="button button__secondary"
          >
            <div className="inner">To page</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
