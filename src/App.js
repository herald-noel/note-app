import "./App.css";
import axios from "axios";
import { baseUrl } from "./Default";
import { useEffect, useState } from "react";

function App() {
	const [userNotes, setUserNotes] = useState([]);

	async function getUserNotes(userId) {
		try {
			const response = await axios.get(`${baseUrl}/mynotes.php?id=${userId}`);
			setUserNotes(response.data.notes);
		} catch (err) {
			console.log(err);
		}
	}

	const changeUser = (event) => {
		const userId = event.target.value;
		getUserNotes(userId);
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-dark d-flex justify-content-between">
				<div className="navbar-brand text-white">Notes App</div>
				<div>
					<div className="input-group">
						<input
							type="text"
							placeholder="Firstname"
							aria-label="First name"
							className="form-control"
						/>
						<input
							type="text"
							placeholder="Lastname"
							aria-label="Last name"
							className="form-control ml-2"
						/>
						<button className="btn btn-primary ml-3">Create User</button>
					</div>
				</div>
			</nav>
			<div className="container">
				<div className="d-flex justify-content-between align-items-center mt-5 mb-3">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text">id</span>
							<input
								type="text"
								className="form-control"
								placeholder="User"
								aria-label="User"
								onChange={changeUser}
							/>
						</div>
					</div>

					<div>
						<button className="btn btn-secondary">Add Note</button>
					</div>
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Notes</th>
							<th scope="col">Date</th>
						</tr>
					</thead>
					<tbody>
						{userNotes.map((note, index) => (
							<tr key={index}>
								<td>{note[0]}</td>
								<td>{note[1]}</td>
							</tr>
						))}
					</tbody>

					{userNotes.length === 0 && (
						<div class="p-5 display-4 text-info">No User Found.</div>
					)}
				</table>
			</div>
		</>
	);
}

export default App;
