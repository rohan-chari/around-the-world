import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { smoothZoomTo } from '../utils/smoothZoomTo';
import { useLocation } from 'react-router-dom';



const DetailedCountryGlobe = () => {
  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const location = useLocation();

  const countryCode = location.state?.countryCode;
  const latitude = location.state?.latitude;
  const longitude = location.state?.longitude;

  useEffect(() => {
    fetch('/datasets/countries_' + countryCode + '.json').then(res => res.json()).then(setCountries);

    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false;
      smoothZoomTo(globeEl.current, latitude, longitude, .65, countryCode);
    }
  }, [countryCode,latitude,longitude]);

  const onPolygonClick = async (country) => {
    if(globeEl.current){
      const countryFeatureCollection = {
        type: "FeatureCollection",
        features: [country] 
      };
      setCountries(countryFeatureCollection);
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

export default DetailedCountryGlobe;
