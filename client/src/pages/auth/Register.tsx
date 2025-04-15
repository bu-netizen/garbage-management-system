
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Register data:", data);
    // handle registration logic here
  };

  const password = watch("password");

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-50">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80 border rounded-lg p-5">
        <h2 className="text-3xl font-semibold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters required" },
          })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered w-full"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
        <Link to="/login" className="btn btn-link w-full">
          Already have an account? Login
        </Link>
      </form>
    </main>
  );
}

export default Register;
