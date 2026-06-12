import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader, UserRound } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.jsx";
function Login() {
	// const navigate = useNavigate();

	const { Login, isLoggingIn } = useAuthStore();
	const [data, setData] = useState({
		email: "@kce.ac.in",
		password: "123456",
	});
	const [showPassword, setShowPassword] = useState(false);

	const HandleLogin = async (e) => {
		e.preventDefault();
		await Login(data);
	};

	return (
		<div className="sm:h-120 font-sans flex items-center justify-center px-4">
			<div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-sm sm:max-w-md flex flex-col justify-center">

				<div className="flex flex-col items-center mb-8">
					<div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
						<UserRound className="size-8 text-orange-500" />
					</div>
					<h2 className="text-2xl sm:text-3xl font-normal text-black">Log In</h2>
				</div>

				<form className="space-y-4" onSubmit={HandleLogin}>
					<input
						type="email"
						name="email"
						required
						value={data.email}
						onChange={e => setData({ ...data, email: e.target.value })}
						autoComplete="off"
						placeholder="Enter E-Mail"
						className="w-full px-4 py-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
					/>

					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={data.password}
							required
							onChange={e => setData({ ...data, password: e.target.value })}
							autoComplete="off"
							placeholder="Enter Password"
							className="w-full px-4 py-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 bg-transparent pr-12"
						/>
						<button
							type="button"
							tabIndex={-1}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 focus:outline-none cursor-pointer"
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
						</button>
					</div>

					<button
						disabled={isLoggingIn}
						className={`w-full text-orange-600 font-medium py-3 rounded-md transition ${isLoggingIn ? "bg-orange-50 cursor-not-allowed" : "bg-orange-100 hover:bg-orange-200 cursor-pointer"}`}
					>
						{isLoggingIn ? <div className="flex items-center justify-center">
							<Loader className="animate-spin" size={23} />
						</div> : "Login"}
					</button>
				</form>
			</div>
		</div>

		// <div className="h-96 font-sans  flex items-center justify-center">
		// 	<div className="bg-white rounded-xl shadow-2xl p-12 w-full max-w-md flex flex-col justify-center fixed top-30    ">

		// 		<div className="flex flex-col items-center mb-8">
		// 			<div className="bg-orange-100 rounded-full w-24 h-24 flex items-center justify-center mb-4">
		// 				<UserRound className="size-10 text-orange-500" />
		// 			</div>
		// 			<h2 className="text-3xl font-normal text-black">Log In</h2>
		// 		</div>
		// 		<form className="space-y-4" onSubmit={HandleLogin}>
		// 			<input
		// 				type="email"
		// 				name="email"
		// 				required
		// 				value={data.email}
		// 				onChange={e => setData({ ...data, email: e.target.value })}
		// 				autoComplete="off"
		// 				placeholder="Enter E-Mail"
		// 				className="w-full px-4 py-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
		// 			/>

		// 			<div className="relative">
		// 				<input
		// 					type={showPassword ? "text" : "password"}
		// 					name="password"
		// 					value={data.password}
		// 					required
		// 					onChange={e => setData({ ...data, password: e.target.value })}
		// 					autoComplete="off"
		// 					placeholder="Enter Password"
		// 					className="w-full px-4 py-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 bg-transparent pr-12"
		// 				/>
		// 				<button
		// 					type="button"
		// 					tabIndex={-1}
		// 					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 focus:outline-none cursor-pointer"
		// 					onClick={() => setShowPassword((prev) => !prev)}
		// 				>
		// 					{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
		// 				</button>
		// 			</div>
		// 			<button
		// 				className="w-full bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium py-3 cursor-pointer rounded-md transition"
		// 			>
		// 				Login
		// 			</button>
		// 		</form>
		// 	</div>
		// </div>
	);
}

export default Login;
