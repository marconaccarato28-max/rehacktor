import { useForm } from "react-hook-form";
import { supabase } from "../services/supabase.js";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registrazione completata. Controlla la tua email.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 rounded-box bg-base-100 p-8 shadow-xl"
      >
        <h1 className="text-center text-3xl font-bold">
          Registrazione
        </h1>

        <input
          className="input input-bordered w-full"
          placeholder="Username"
          {...register("username", {
            required: "Username obbligatorio",
          })}
        />

        {errors.username && (
          <p className="text-error">
            {errors.username.message}
          </p>
        )}

        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Email"
          {...register("email", {
            required: "Email obbligatoria",
          })}
        />

        {errors.email && (
          <p className="text-error">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          {...register("password", {
            required: "Password obbligatoria",
            minLength: {
              value: 6,
              message: "Minimo 6 caratteri",
            },
          })}
        />

        {errors.password && (
          <p className="text-error">
            {errors.password.message}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          Registrati
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;