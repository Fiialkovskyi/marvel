import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=799ca838b1d148bcf6fc9ed8dc0e8a0d";
  const _baseOffset = 210;

  const { loading, request, error, clearError } = useHttp();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map((item) => _transformCharacter(item));
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
        id: comics.id,
        title: comics.title,
        thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
        price: comics.prices[0].price,
    };
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map((item) => _transformComics(item));
  };

  return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics };
};

export default useMarvelService;
