import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useNavigate } from 'react-router-dom';

const GlobeComponent = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch countries geojson
    fetch('/datasets/countries_world.geojson').then(res => res.json()).then(setCountries);
    // Initialize globe settings
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.05;
    }
  }, []);

    const onPolygonClick = async (country) => {
        if(globeEl.current){
            const targetLat = (country.bbox[1] + country.bbox[3]) / 2;
            const targetLng = (country.bbox[0] + country.bbox[2]) / 2;
            const data = await fetch('/datasets/countries_' + country.properties.ADM0_A3 + '.json').then(res => res.json())
            navigate(`/country/${country.properties.ADM0_A3}`, { state: { countryCode: country.properties.ADM0_A3, latitude: targetLat, longitude: targetLng, borders: data } });
        }
    };

    return (
        <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            hexPolygonsData={countries.features}
            hexPolygonResolution={3}
            hexPolygonMargin={0.001} // Small margin to reduce "border" effect from hex edges
            hexPolygonUseDots={false}
            hexPolygonColor={() => `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0)`}
            polygonsData={countries.features} // Adding this line to draw country borders
            polygonStrokeColor={() => '#f5c5ae'} //  specify the color for the borders
            polygonCapColor={() => 'rgba(0, 0, 0, 0)'} // fill of the polygons transparent
            onPolygonClick={onPolygonClick}
            polygonAltitude={.006}
            polygonLabel={({ properties: d }) => `
                <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
                Population: <i>${d.POP_EST}</i>
            `}
        />
    );

};

export default GlobeComponent;
