import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeComponent = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    // Fetch countries geojson
    fetch('/datasets/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(setCountries);
    // Initialize globe settings
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false;
      globeEl.current.controls().autoRotateSpeed = 0.05;
    }
  }, []);

    return (
        <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            hexPolygonsData={countries.features}
            hexPolygonResolution={3}
            hexPolygonMargin={0.01} // Small margin to reduce "border" effect from hex edges
            hexPolygonUseDots={false}
            hexPolygonColor={() => `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.1)`}
            polygonsData={countries.features} // Adding this line to draw country borders
            polygonStrokeColor={() => '#f5c5ae'} // You can specify the color for the borders
            polygonCapColor={() => 'rgba(0, 0, 0, 0)'} // Making the fill of the polygons transparent
            polygonAltitude={.0035}
            polygonLabel={({ properties: d }) => `
                <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
                Population: <i>${d.POP_EST}</i>
            `}
        />
    );
};

export default GlobeComponent;
