import HomePage from "./features/HomePage";
import { Routes, Route } from "react-router-dom";
import RepositoriesPage from "./features/RepositoriesPage";
import RepositoryPage from "./features/RepositoryPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path="repositories">
        <Route index element={<RepositoriesPage />} />

        <Route path=":repoId" element={<RepositoryPage />} />
      </Route>

    </Routes>
  );
}

export default App;

