import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import axios from "axios";
type FormData = {
	email: string;
	password: string;
};

function Login() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = (data: FormData) => {
		console.log("Register data:", data);
		axios
			.post("http://localhost:5001/api/auth/login", data,{withCredentials: true})
			.then(() => navigate("/PublicDashboard"))
			.catch((error) => console.log(error));
	};

	return (
		<main className="flex items-center justify-center min-h-screen bg-green-50">
			<Link to={"/"} className="btn btn-primary fixed top-5 left-5 rounded">
				<Home size={20} />
			</Link>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 w-80 border rounded-lg p-5"
			>
				<h1 className="text-3xl font-semibold mb-4">Login</h1>
				<input
					type="email"
					placeholder="Email"
					className="input input-bordered w-full"
					{...register("email", { required: "Email is required" })}
				/>
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)}

				<input
					type="password"
					placeholder="Password"
					className="input input-bordered w-full"
					{...register("password", { required: "Password is required" })}
				/>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)}

				<button type="submit" className="btn btn-primary w-full">
					Login
				</button>
				<Link to="/register" className="btn btn-link w-full">
					Don't have an account? Register
				</Link>
			</form>
		</main>
	);
}

export default Login;
