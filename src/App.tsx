import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

function App() {
  const formSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }).max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
    email: z.string().email({ message: "O email deve ser válido." }),
    password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres." }).max(100, { message: "A senha deve ter no máximo 100 caracteres." })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchemaType>({ resolver: zodResolver(formSchema) })

  type formSchemaType = z.infer<typeof formSchema>

  const formSubmit = (data: formSchemaType) => {
    console.log(data)
  }

  return (
    <div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4'>
        <form className="w-[500px] border p-4 py-5 flex items-center bg-zinc-900 flex-col gap-4 rounded-xl border-zinc-400">
          <span className="text-white font-bold text-xl">Validação de formulário</span>
          <div className="w-full flex flex-col gap-3">
            <input {...register('name')} placeholder="Nome" className="w-full px-4 outline-none border hover:border-zinc-300 focus:border-violet-600 focus:border-2 py-3 text-white rounded-lg border-zinc-400 bg-zinc-900" />
            {errors.name && (
              <span className="text-red-400 text-sm">{errors.name.message}</span>
            )}
            <input {...register('email')} placeholder="Email" className="w-full px-4 outline-none border hover:border-zinc-300 focus:border-violet-600 focus:border-2 py-3 text-white rounded-lg border-zinc-400 bg-zinc-900" />
            {errors.email && (
              <span className="text-red-400 text-sm">{errors.email.message}</span>
            )}
            <input {...register('password')} placeholder="Senha" className="w-full px-4 outline-none border hover:border-zinc-300 focus:border-violet-600 focus:border-2 py-3 text-white rounded-lg border-zinc-400 bg-zinc-900" />
            {errors.password && (
              <span className="text-red-400 text-sm">{errors.password.message}</span>
            )}
            <button onClick={handleSubmit(formSubmit)} className="w-full py-3 hover:bg-violet-700 focus:bg-violet-800 outline-none text-white font-bold uppercase rounded-lg bg-violet-600">Validar</button>
          </div>
        </form >
      </div>
    </div>
  )
}

export default App
