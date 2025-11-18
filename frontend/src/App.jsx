import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import { checkAuth } from "./features/authSlice";

const App = () => {
	const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	return (
		<Routes>
			{/* Protected route */}
			<Route
				path="/"
				element={user ? <Tasks /> : <Navigate to="/login" />}
			/>

			<Route
				path="/login"
				element={user ? <Navigate to="/" /> : <Login />}
			/>

			<Route
				path="/register"
				element={user ? <Navigate to="/" /> : <Register />}
			/>

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default App;
