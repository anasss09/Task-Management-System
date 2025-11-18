import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<nav className="bg-white shadow-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo/Brand */}
					<div className="shink-0">
						<h1 className="text-xl font-bold text-gray-800">
							Task Manager
						</h1>
					</div>

					{/* User info and Logout button */}
					<div className="flex items-center space-x-4">
						{user && (
							<>
								<span className="text-sm text-gray-600">
									Welcome, {user.fullName}
								</span>

								<button
									onClick={handleLogout}
									className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
								>
									<LogOut className="h-4 w-4" />
									<span>Logout</span>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
