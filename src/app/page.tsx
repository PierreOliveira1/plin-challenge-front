"use client";
import Image from "next/image";
import { useClimate } from "./useClimate";
import { Loading } from "@/components/Loading";

export default function Home() {
  const climate = useClimate();

  if (climate.isLoading) {
    return <Loading />;
  }

  if (climate.isError) {
    return (
      <h2 className="text-2xl font-semibold mb-2">
        Ocorreu um erro ao carregar os dados...
      </h2>
    );
  }

  if (climate.isSuccess) {
    const { location, current } = climate.data;

    const iconUrl = `https:${current.condition.icon}`;

    return (
      <main>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-black text-white rounded-lg shadow-lg p-4 border-purple-500 border-4">
            <h2 className="text-2xl font-semibold mb-2">
              Clima em {location.name}
            </h2>
            <Image
              src={iconUrl}
              width={16}
              height={16}
              priority
              alt="Weather Icon"
              className="w-16 h-16"
            />
            <p className="text-lg">Temperatura: {current.temp_c}°C</p>
            <p className="text-lg">Condição: {current.condition.text}</p>
            <p className="text-lg">
              Velocidade do vento: {current.wind_kph} km/h
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <h2 className="text-2xl font-semibold mb-2">
      Aceite a permissão para acessar sua localização...
    </h2>
  );
}
