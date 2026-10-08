import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase.js";

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Accesso effettuato");

    navigate("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 rounded-box bg-base-100 p-8 shadow-xl"
      >
        <h1 className="text-center text-3xl font-bold">
          Login
        </h1>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", {
              required: "Email obbligatoria",
            })}
          />

          {errors.email && (
            <p className="mt-1 text-error">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password obbligatoria",
              minLength: {
                value: 6,
                message: "Minimo 6 caratteri",
              },
            })}
          />

          {errors.password && (
            <p className="mt-1 text-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Accesso..." : "Accedi"}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;