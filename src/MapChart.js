import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const geoUrl1 = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const enabledId = ["08", "20", "31", "46", "56019", "56009", "56007"];

const MapChart = () => {
  const [geoMap, setGeo] = useState(geoUrl);
  const [selectedId, setSelectedId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);

  const handleCountryClick = (geography, projection, path) => (event) => {
    console.log("test", geography);
    if (enabledId.includes(geography.id)) {
      const centroid = projection.invert(path.centroid(geography));
      setCenter(centroid);
      // setZoom(3);
      setSelectedId(geography.id);
    }
  };
  return (
    <>
      <button onClick={() => setGeo(geoMap === geoUrl ? geoUrl1 : geoUrl)}>
        test
      </button>
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup center={center} zoom={zoom} className="zoom">
          <Geographies geography={geoMap}>
            {({ geographies, projection, path }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    className={"test"}
                    style={{
                      default: {
                        fill:
                          geo.id === selectedId
                            ? "#4b8f48"
                            : enabledId.includes(geo.id)
                            ? "#2e572c"
                            : "#dddddd",
                        outline: "none",
                      },
                      hover: {
                        fill: enabledId.includes(geo.id)
                          ? "#4b8f48"
                          : "#dddddd",
                        outline: "none",
                        cursor: enabledId.includes(geo.id) ? "pointer" : "",
                      },
                      pressed: {
                        fill: enabledId.includes(geo.id)
                          ? "#4b8f48"
                          : "#dddddd",
                        outline: "none",
                      },
                    }}
                    onClick={handleCountryClick(geo, projection, path)}
                  />
                ))}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default MapChart;
