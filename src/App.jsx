import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const api_key = `fe92107181054a27a73181256232611`;

  const [id, setId] = useState({
    value: "",
  });
  const [ubicacion, setUbicacion] = useState({
    ciudad: "",
    region: "",
    pais: "",
    temp_c: "",
    temp_f: "",
    temp_like_c: "",
    temp_like_f: "",
    condicion: "",
    humedad: "",
    v_viento: "",
    d_viento: "",
    r_uv: "",
    hora: "",
    img: "",
  });

  const handleDefault = (event) => {
    setUbicacion({
      ...ubicacion,
      ciudad: "",
      region: "",
      pais: "",
      temp_c: "",
      temp_f: "",
      temp_like_c: "",
      temp_like_f: "",
      condicion: "",
      humedad: "",
      v_viento: "",
      d_viento: "",
      r_uv: "",
      hora: "",
      img: "",
    });
  };

  const handleValue = (event) => {
    setId({ ...id, value: event.target.value });
  };

  function onSearch(location) {
    //console.log(location);
    axios(
      `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=no`
    )
      .then(({ data }) => {
        if (data) {
          console.log(data);
          setUbicacion({
            ...ubicacion,
            ciudad: data.location.name,
            region: data.location.region,
            pais: data.location.country,
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            temp_min_c: data.current.feelslike_c,
            temp_min_f: data.current.feelslike_f,
            condicion: data.current.condition.text,
            humedad: data.current.humidity,
            v_viento: data.current.wind_kph,
            d_viento: data.current.wind_dir,
            hora: data.location.localtime,
            img: data.current.condition.icon,
          });

          setId({ ...id, value: "" });
        } else {
          // Mostrar ventana emergente con mensaje de error
          window.alert("Ingresa una Ubicacion Correcta");
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error("Error en la solicitud:", error.message);
        // Mostrar ventana emergente con mensaje de error
        window.alert(
          "Hubo un problema al obtener la información del clima. Por favor, inténtalo de nuevo más tarde."
        );
      });
  }

  const renderizarDivInicio = () => {
    if (ubicacion.ciudad.length === 0) {
      return (
        <div id="main-landing">
          <span class="material-symbols-outlined">routine</span>
          <h1>Enter your location</h1>
        </div>
      );
    } else {
      return (
        <div id="card">
          <div id="card-title">
            <h1>
              {ubicacion.ciudad}, {ubicacion.pais}
            </h1>
            <h2>{ubicacion.region}</h2>
          </div>
          <div id="card-info">
            <div>
              {ubicacion.condicion === "Sunny" &&
                ubicacion.img.includes("day") && (
                  <span class="material-symbols-outlined">sunny</span>
                )}

              {ubicacion.condicion === "Clear" &&
                ubicacion.img.includes("night") && (
                  <span class="material-symbols-outlined">clear_night</span>
                )}

              {ubicacion.condicion === "Partly cloudy" &&
                ubicacion.img.includes("day") && (
                  <span class="material-symbols-outlined">
                    partly_cloudy_day
                  </span>
                )}

              {ubicacion.condicion === "Partly cloudy" &&
                ubicacion.img.includes("night") && (
                  <span class="material-symbols-outlined">nights_stay</span>
                )}

              {ubicacion.condicion === "Mist" && (
                <span class="material-symbols-outlined">foggy</span>
              )}
              {ubicacion.condicion === "Patchy rain possible" && (
                <span class="material-symbols-outlined">weather_hail</span>
              )}
              {ubicacion.condicion === "Light rain" && (
                <span class="material-symbols-outlined">weather_hail</span>
              )}
              {ubicacion.condicion === "Light snow" && (
                <span class="material-symbols-outlined">weather_snowy</span>
              )}
              {ubicacion.condicion === "Cloudy" && (
                <span class="material-symbols-outlined">cloud</span>
              )}

              {ubicacion.condicion === "Light drizzle" && (
                <span class="material-symbols-outlined">rainy_light</span>
              )}
              {ubicacion.condicion === "Moderate rain at times" && (
                <span class="material-symbols-outlined">weather_hail</span>
              )}
              {ubicacion.condicion === "Overcast" && (
                <span class="material-symbols-outlined">cloud</span>
              )}
              {ubicacion.condicion === "Heavy snow" && (
                <span class="material-symbols-outlined">snowing_heavy</span>
              )}
               {ubicacion.condicion === "Heavy rain" && (
                <span class="material-symbols-outlined">rainy_heavy</span>
              )}
              {ubicacion.condicion === "Rain" && (
                <span class="material-symbols-outlined">rainy</span>
              )}
              {ubicacion.condicion === "Storm" && (
                <span class="material-symbols-outlined">thunderstorm</span>
              )}
              {ubicacion.condicion === "Thunder storm" && (
                <span class="material-symbols-outlined">thunderstorm</span>
              )}
              {ubicacion.condicion === "Moderate or heavy rain with thunder" && (
                <span class="material-symbols-outlined">thunderstorm</span>
              )}
            </div>
            <div>
              <h1>
                {ubicacion.temp_c}°C | {ubicacion.temp_f}°F
              </h1>
              <h2>{ubicacion.condicion}</h2>
            </div>
          </div>
          <div id="card-stats">
            <div id="inner-stats">
              <div id="stats-humity">
                <span id="humity-stats" class="material-symbols-outlined">
                  humidity_percentage
                </span>
                <h3>{ubicacion.humedad}</h3>
              </div>
              <div id="stats-v_viento">
                <span class="material-symbols-outlined">air</span>
                <h3>{ubicacion.v_viento} kph</h3>
              </div>
              <div id="stats-d_viento">
                <span class="material-symbols-outlined">explore</span>
                <h3>{ubicacion.d_viento}</h3>
              </div>
              <div id="stats-time">
                <span class="material-symbols-outlined">schedule</span>
                <h3>{ubicacion.hora}</h3>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div id="main_div">
      <div id="title-div">
        <h1>The Weather APP</h1>
        <span id="title-span" class="material-symbols-outlined">
          nest_farsight_weather
        </span>
      </div>
      <div id="search-div">
        <input
          id="search_input"
          type="search"
          placeholder="Enter your location..."
          value={id.value}
          onChange={handleValue}
        />
        <button class="sbutton" onClick={() => onSearch(id.value)}>
          Search
        </button>
        <button class="sbutton" onClick={() => handleDefault()}>
          Reset
        </button>
      </div>
      <div id="card_div">{renderizarDivInicio()}</div>
    </div>
  );
}

export default App;
