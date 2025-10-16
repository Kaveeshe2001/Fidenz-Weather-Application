import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home/Home";
import WeatherDetailPage from "./pages/WeatherDetail/WeatherDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:cityName" element={<WeatherDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App;
