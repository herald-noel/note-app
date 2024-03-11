import "./App.css";
import axios from "axios";
import { baseUrl } from "./Default";
import { useEffect, useState } from "react";

function App() {
	const [userNotes, setUserNotes] = useState([]);
	const [currUserId, setCurrUserId] = useState("");
	const [userData, setUserData] = useState();
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	async function getUserNotes(userId) {
		try {
			const response = await axios.get(`${baseUrl}/mynotes.php?id=${userId}`);
			setUserNotes(response.data.notes);
		} catch (err) {
			console.log(err);
		}
	}

	async function createUser(userDetails) {
		try {
			const response = await axios.post(
				`${baseUrl}/newuser.php`,
				{
					firstname: userDetails.firstname,
					lastname: userDetails.lastname,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);

			setUserData(response.data);
			setCurrUserId(response.data.id);
			if (response.data.id) {
				alert("Successfully created the user.");
			}
		} catch (err) {
			console.log(err);
		}
	}

	const changeUser = (event) => {
		const userId = event.target.value;
		getUserNotes(userId);
		setCurrUserId(userId);
	};

	const btnCreateUser = () => {
		const userDetails = formData;
		createUser(userDetails);
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
							name="firstname"
							onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="Lastname"
							aria-label="Last name"
							className="form-control ml-2"
							name="lastname"
							onChange={handleChange}
						/>
						<button className="btn btn-secondary ml-3" onClick={btnCreateUser}>
							Create User
						</button>
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
								value={currUserId}
								onChange={changeUser}
							/>
						</div>
					</div>

					<div>
						<button
							className="btn btn-primary"
							data-toggle="modal"
							data-target="#noteModal"
						>
							Add Note
						</button>
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
				</table>
				{userNotes.length === 0 && (
					<div className="p-5 display-4 text-danger">No Notes Found.</div>
				)}
			</div>

			{/* Modal */}
			<div
				className="modal fade"
				id="noteModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content" style={{ backgroundColor: "#fff2ab" }}>
						<div
							className="modal-header"
							style={{ backgroundColor: "#FFDB30" }}
						>
							<h5 className="modal-title" id="exampleModalLabel">
								New Note
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="recipient-name" className="col-form-label">
										User ID:
									</label>
									<input
										type="text"
										className="form-control"
										id="recipient-name"
										value={currUserId === "" ? "No User found" : currUserId}
										disabled
									/>
								</div>
								<div className="form-group">
									<label htmlFor="message-text" className="col-form-label">
										Note:
									</label>
									<textarea
										className="form-control"
										id="message-text"
										style={{ backgroundColor: "#fff7d1" }}
										disabled={currUserId === ""}
									></textarea>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								disabled={currUserId === ""}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
