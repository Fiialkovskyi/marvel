import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import ErrorMessage from "./../errorMessage/ErrorMessage";

const MainPage = lazy(() => import("./../pages/MainPage"));
const ComicsPage = lazy(() => import("./../pages/ComicsPage"));
const Page404 = lazy(() => import("./../pages/Page404"));
const ComicDetailsPage = lazy(() => import("./../pages/ComicDetailsPage"));
const CharDetailsPage = lazy(() => import("./../pages/CharDetailsPage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<ErrorMessage />}>
            <Routes>
              <Route path="/" exact element={<MainPage />} />
              <Route path="/comics" exact element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<ComicDetailsPage />} />
              <Route path="/characters/:charId" element={<CharDetailsPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
