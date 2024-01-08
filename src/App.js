import React, { useState, useEffect } from "react";
import RUTable from "./components/RUTable/RUTable";
import "./App.css";
import dataset from "./data/dataset.json";
import RUTableHeader from "./components/RUTableHeader/RUTableHeader";

function App() {
	const [floorPlanData, setFloorPlanData] = useState([[], [], [], []]);
	const [activeDiodeId, setActiveDiodeId] = useState(null);
	const [activeUnmask, setActiveUnmask] = useState(null);

	const handleDiodeClick = (diodeId) => {
		setActiveDiodeId(activeDiodeId === diodeId ? null : diodeId);
	};
	const handleUnmaskClick = (seatUUID) => {
		setActiveUnmask(activeUnmask === seatUUID ? null : seatUUID);
	};

	useEffect(() => {
		const processedData = processProductsForGrids(dataset);
		setFloorPlanData(processedData);
	}, []);

	return (
		<div className="App">
			<div className="table-container">
				<table className="ru-table" border="0" cellSpacing="0" cellPadding="0">
					<RUTableHeader />
					<RUTable
						gridData={floorPlanData}
						onUnmaskClick={handleUnmaskClick}
						onDiodeClick={handleDiodeClick}
						activeUnmask={activeUnmask}
						activeDiodeId={activeDiodeId}
					/>
					<tfoot>
						<tr className="misc-block-row">
							<td className="misc-block-content">MISC BLOCK</td>
						</tr>
					</tfoot>
				</table>
				<div className="io-column">I/Os</div>
			</div>
		</div>
	);
}

/* 
Round Robin Distribution: 
Distributes products across grids in a round-robin fashion, 
toggling placement from top to bottom for each grid.
*/

function processProductsForGrids(products, totalRUs = 80) {
	const gridsCount = 4;
	const gridCapacity = totalRUs / gridsCount;
	let grids = Array.from({ length: gridsCount }, () =>
		Array.from({ length: gridCapacity }, () => ({
			diode: "",
			unmask: "",
			seatUUID: "",
		}))
	);

	let flatProducts = [];
	products.forEach((product) => {
		for (let i = 0; i < product.repeat; i++) {
			flatProducts.push(product.product);
		}
	});

	function canPlaceProduct(gridIndex, position, product) {
		// Check constraint 1 - Core i4/i5 products can only be placed in grids 1 and 2.
		if ((product.includes("i4") || product.includes("i5")) && gridIndex > 1) {
			return false;
		}
		// Check constraint 2 - No two products can be adjacent to each other.
		// Check if same product present in the cell directly above current cell.
		if (position > 0 && grids[gridIndex][position - 1].seatUUID === product) {
			return false;
		}
		// Check constraint 2 - No two products can be adjacent to each other.
		// Check if same product present in the cell directly below current cell.
		if (
			position < gridCapacity - 1 &&
			grids[gridIndex][position + 1].seatUUID === product
		) {
			return false;
		}
		return true;
	}

	let currentGridIndex = 0;
	// Initialize fromTop toggle flags for each grid.
	let fromTopFlags = Array(gridsCount).fill(true);

	// Distribute products across grids.
	flatProducts.forEach((product) => {
		// Placement logic is to alternate from top and bottom of the grid based on fromTopFlags.
		let placed = false;
		for (let attempts = 0; attempts < gridsCount && !placed; attempts++) {
			let positions = Array.from({ length: gridCapacity }, (_, i) => i);
			if (!fromTopFlags[currentGridIndex]) {
				positions.reverse();
			}

			for (let position of positions) {
				if (
					!grids[currentGridIndex][position].seatUUID &&
					canPlaceProduct(currentGridIndex, position, product)
				) {
					grids[currentGridIndex][position].seatUUID = product;
					placed = true;
					break;
				}
			}

			// Toggle the fromTop flag for the current grid.
			fromTopFlags[currentGridIndex] = !fromTopFlags[currentGridIndex];
			currentGridIndex = (currentGridIndex + 1) % gridsCount;
		}

		if (!placed) {
			console.error(`Could not place product: ${product}`);
		}
	});

	return grids;
}

export default App;
