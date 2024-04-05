import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { smoothZoomTo } from '../utils/smoothZoomTo';


const GlobeComponent = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });

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
            console.log('country',country)
            const targetLat = (country.bbox[1] + country.bbox[3]) / 2;
            const targetLng = (country.bbox[0] + country.bbox[2]) / 2;
            fetchDetailedCountryGeoJSON(country.properties.ISO_A2).then(setCountries);
            smoothZoomTo(globeEl.current, targetLat, targetLng, .65, country);
            globeEl.current.controls().autoRotate = false;
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

    async function fetchDetailedCountryGeoJSON(isoCode) {
        const response = await fetch(`/datasets/countries_USA.json`);
        const data = await response.json();
        return data;
    }
};

export default GlobeComponent;
