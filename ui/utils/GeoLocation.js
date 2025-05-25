import { Exception } from "sass";

export const getGeo = () => {
  if ('serviceWorker' in navigator) {
    if (navigator.geolocation)
      return navigator.geolocation.getCurrentPosition();
    else
      throw new Exception("Geolocation is not supported by this browser.");
  };
}