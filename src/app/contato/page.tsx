"use client";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";

type PropsForm = {
  name: string;
  email: string;
  message: string;
  archive: FileList;
};

export default function Contato() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsForm>();

  const onSubmit = (data: PropsForm) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto mt-10 pt-7">
      <h1 className="text-3xl font-semibold mb-4">Entre em Contato</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-white font-bold mb-2">
            Nome
          </label>
          <Input
            {...register("name", {
              required: { message: "Campo obrigatório", value: true },
            })}
            placeholder="Seu Nome"
            className="w-full"
            error={errors.name?.message}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-bold mb-2">
            Email
          </label>
          <Input
            {...register("email", {
              required: { message: "Campo obrigatório", value: true },
            })}
            id="email"
            className="w-full"
            placeholder="Seu Email"
            error={errors.email?.message}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mensagem" className="block text-white font-bold mb-2">
            Mensagem
          </label>
          <textarea
            {...register("message", { required: true })}
            id="mensagem"
            className={
              "border border-none outline-none p-2 rounded w-full text-black"
            }
            rows={4}
            placeholder="Sua Mensagem"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="arquivo" className="block text-white font-bold mb-2">
            Arquivo
          </label>
          <Input
            {...register("archive", {
              required: { message: "Campo obrigatório", value: true },
            })}
            type="file"
            accept="application/pdf"
            id="arquivo"
            className="w-full"
            error={errors.archive?.message}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Enviar Mensagem
          </button>
        </div>
      </form>
    </div>
  );
}
