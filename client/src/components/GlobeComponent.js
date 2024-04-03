import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const GlobeComponent = () => {
  const globeEl = useRef();

  useEffect(() => {
    // Initialize globe
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = .05;
  }, []);

  return <Globe
    ref={globeEl}
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
  />;
};

export default GlobeComponent;
