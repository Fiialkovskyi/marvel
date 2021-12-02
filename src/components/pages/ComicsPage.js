import AppBanner from "./../appBanner/AppBanner";
import ComicsList from "./../comicsList/ComicsList";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="List of Marvels comics"
        />
        <title>Comics</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
