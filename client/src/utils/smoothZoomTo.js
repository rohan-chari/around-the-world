export const smoothZoomTo = (globeRef, targetLat, targetLng, targetAltitude, country, duration = 1000) => {
    const startTime = Date.now();
  
    console.log('countrey',country)

    const startPOV = globeRef.pointOfView();
    const endPOV = { lat: targetLat, lng: targetLng, altitude: targetAltitude };

    
    function animate() {
      const elapsedTime = Date.now() - startTime;
      const fraction = Math.min(1, elapsedTime / duration);
  
      // Apply an easing function to fraction if desired
      const easedFraction = fraction; // Placeholder for easing logic
  
      // Interpolate between start and end points
      const nextPOV = {
        lat: startPOV.lat + (endPOV.lat - startPOV.lat) * easedFraction,
        lng: startPOV.lng + (endPOV.lng - startPOV.lng) * easedFraction,
        altitude: startPOV.altitude + (endPOV.altitude - startPOV.altitude) * easedFraction,
      };

      if(country.properties.ADMIN === 'United States of America')
        {
            nextPOV.altitude *= 1.5
        }
    
      // Update the globe's POV
      globeRef.pointOfView(nextPOV);
  
      if (fraction < 1) {
        requestAnimationFrame(animate); // Continue the animation
      }
    }
  
    animate();
  };