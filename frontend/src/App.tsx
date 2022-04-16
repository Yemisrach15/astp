import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import {
	Navbar,
	EmployeesList,
	CreateEmployee,
	EditEmployee
} from "./components";

const Div = styled.div`
	padding: 0 1em;
`;

function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<br />
				<Div>
					<Routes>
						<Route path="/" element={<EmployeesList />} />
						<Route path="/register" element={<CreateEmployee />} />
						<Route path="/edit/:id" element={<EditEmployee />} />
						<Route
							path="*"
							element={
								<h1 style={{ textAlign: "center" }}>There's nothing here!</h1>
							}
						/>
					</Routes>
				</Div>
			</div>
		</BrowserRouter>
	);
}

export default App;
