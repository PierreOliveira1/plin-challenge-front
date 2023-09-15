"use client";
import { Input } from "@/components/Input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

type PropsForm = {
  street: string;
  city: string;
  state: string;
};

type Cep = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

const fetchCepByAddress = async (address: string) => {
  const response = await fetch(`https://viacep.com.br/ws/${address}/json/`);
  return await response.json();
};

export default function Cep() {
  const form = useForm<PropsForm>();
  const [cep, setCep] = useState("");
  const cepQuery = useQuery<Cep[], Error>(["cep", cep], () =>
    fetchCepByAddress(cep)
  );

  const onSubmit = (data: PropsForm) => {
    const address = `${data.state}/${data.city}/${data.street}`;
    setCep(address);
  };

  return (
    <main className="container h-screen flex flex-col justify-center items-center mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-4">Busca de CEP por Endereço</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4 md:flex flex-col">
          <Input
            {...form.register("street", {
              required: {
                message: "Campo obrigatório",
                value: true,
              },
            })}
            placeholder="Rua"
            error={form.formState.errors.street?.message}
          />
          <Input
            {...form.register("city", {
              required: {
                message: "Campo obrigatório",
                value: true,
              },
            })}
            placeholder="Cidade"
            error={form.formState.errors.city?.message}
          />
          <Input
            {...form.register("state", {
              required: {
                message: "Campo obrigatório",
                value: true,
              },
            })}
            placeholder="Estado EX: BA"
            error={form.formState.errors.state?.message}
          />
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Buscar CEP
          </button>
        </div>
      </form>
      {cepQuery.isSuccess && cepQuery.data.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-4">CEPs Encontrados:</h2>
          <div className="mt-4 flex gap-4">
            {cepQuery.data.map((cep, index) => (
              <div key={index}>
                <p className="pt-4">
                  <span className="font-semibold">CEP:</span> {cep.cep}
                </p>
                <p>
                  <span className="font-semibold">{"LOGRADOURO: "}</span>
                  {cep.logradouro}
                </p>
                <p>
                  <span className="font-semibold">{"Bairro: "}</span>
                  {cep.bairro}
                </p>
                <p>
                  <span className="font-semibold">{"LOCALIDADE: "}</span>
                  {cep.localidade} - {cep.uf}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
