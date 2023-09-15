"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useClimate() {
  const [data, setData] = useState<GeolocationPosition | null>(null);

  async function getClimate() {
    if (data) {
      const {
        coords: { latitude, longitude },
      } = data;
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=cbced8fa0fe34ff2b9c60029231509&q=${latitude},${longitude}`
      );

      return await response.json();
    }
    return null;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setData);
      }
    }
  }, []);

  return useQuery({
    queryKey: ['/climate'],
    queryFn: getClimate,
    enabled: Boolean(data),
  })
}
