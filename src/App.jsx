import { React, useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import Table from "react-bootstrap/Table";
import * as math from "mathjs";
import "./App.css";

export default function App() {
	const data = useQuery("getData") || [];
	const [firstNumber, setFirstNumber] = useState(1);
	const [secondNumber, setSecondNumber] = useState(1);
	const [thirdNumber, setThirdNumber] = useState(1);

	const handleFirstNumberChange = (e) => {
		setFirstNumber(parseInt(e.target.value));
	};

	const handleSecondNumberChange = (e) => {
		setSecondNumber(parseInt(e.target.value));
	};

	const handleThirdNumberChange = (e) => {
		setThirdNumber(parseInt(e.target.value));
	};

	const numberOptions = [];
	for (let i = 1; i <= 10; i++) {
		numberOptions.push(
			<option key={i} value={i}>
				{i}
			</option>
		);
	}

	function computeLR(data) {
		const c = data.length;
		let cov_s_y = 0;
		let cov_Q_y = 0;
		let cov_Q_number_tested_y = 0;
		let cov_Q_level_3_4_y = 0;
		let cov_s_level_3_4 = 0;
		let cov_s_number_tested = 0;
		let cov_Q_level_3_4 = 0;
		let cov_Q_number_tested = 0;
		let cov_Q_number_tested_level_3_4 = 0;
		for (let i = 0; i < data.length; ++i) {
			cov_s_y += data[i].C;
			cov_Q_y += data[i].C ** 2;
			cov_Q_number_tested_y += data[i].A * data[i].C;
			cov_Q_level_3_4_y += data[i].B * data[i].C;
			cov_s_level_3_4 += data[i].B;
			cov_s_number_tested += data[i].A;
			cov_Q_level_3_4 += data[i].B ** 2;
			cov_Q_number_tested += data[i].A ** 2;
			cov_Q_number_tested_level_3_4 += data[i].A * data[i].B;
		}
		const cov = {
			c: c,
			cov_s_y: cov_s_y,
			cov_s_x1: cov_s_number_tested,
			cov_s_x2: cov_s_level_3_4,
			cov_Q_x1: cov_Q_number_tested,
			cov_Q_x2: cov_Q_level_3_4,
			cov_Q_y: cov_Q_y,
			cov_Q_x1_x2: cov_Q_number_tested_level_3_4,
			cov_Q_x1_y: cov_Q_number_tested_y,
			cov_Q_x2_y: cov_Q_level_3_4_y,
		};

		const XTX = math.matrix([
			[c, cov.cov_s_x1, cov.cov_s_x2],
			[cov.cov_s_x1, cov.cov_Q_x1, cov.cov_Q_x1_x2],
			[cov.cov_s_x2, cov.cov_Q_x1_x2, cov.cov_Q_x2],
		]);

		const XTY = math.matrix([
			[cov.cov_s_y],
			[cov.cov_Q_x1_y],
			[cov.cov_Q_x2_y],
		]);
		const inverse = math.inv(XTX);
		try {
			const inverse = math.inv(XTX);
			const result = math.multiply(inverse, XTY).toArray();
			// setLRParameter(result);
		} catch (error) {
			// code to handle the error
			alert("Data Not invertible");
		}
	}

	const addRes = useMutation("addRow");
	async function addRow(event) {
		event.preventDefault();
		const res = await addRes({
			a: firstNumber,
			b: secondNumber,
			c: thirdNumber,
		});
	}

	const deleteRes = useMutation("deleteRow");
	async function deleteRow() {
		const id = data[data.length - 1]._id;
		const res = await deleteRes({ id: id });
	}

	function displayData(data) {
		// console.log(LRparameter);
		let sum_c = 0;
		for (let i = 0; i < data.length; ++i) {
			sum_c += data[i].C;
		}
		return (
			<table className="table">
				<thead>
					<tr>
						<th>A</th>
						<th>B</th>
						<th>C</th>
						<th>Avg</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td>{item.A}</td>
							<td>{item.B}</td>
							<td>{item.C}</td>
							<td>{(sum_c / data.length).toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
	// computeLR(data);

	return (
		<main>
			<h1>Moving Average with Mutable dataset</h1>
			<h2>Dataset</h2>
			<div>{displayData(data)}</div>
			<div className="dropdowns-container">
				<div className="dropdown-container">
					<label htmlFor="first-number-dropdown">First Number:</label>
					<select
						id="first-number-dropdown"
						value={firstNumber}
						onChange={handleFirstNumberChange}
					>
						{numberOptions}
					</select>
				</div>
				<div className="dropdown-container">
					<label htmlFor="second-number-dropdown">Second Number:</label>
					<select
						id="second-number-dropdown"
						value={secondNumber}
						onChange={handleSecondNumberChange}
					>
						{numberOptions}
					</select>
				</div>
				<div className="dropdown-container">
					<label htmlFor="third-number-dropdown">Third Number:</label>
					<select
						id="third-number-dropdown"
						value={thirdNumber}
						onChange={handleThirdNumberChange}
					>
						{numberOptions}
					</select>
				</div>
				<button className="get-numbers-button" onClick={addRow}>
					Insert Row
				</button>
				<button className="get-numbers-button" onClick={deleteRow}>
					Delete Last Row
				</button>
			</div>
			{/* <form onSubmit={computeLR}>
				<input type="submit" value="Predict!" />
			</form> */}
		</main>
	);
}
