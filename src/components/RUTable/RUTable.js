import React from "react";
import RUGrid from "../RUGrid/RUGrid";
import "./RUTable.css";

const RUTable = ({
	gridData,
	onDiodeClick,
	onUnmaskClick,
	activeUnmask,
	activeDiodeId,
}) => {
	if (!gridData || gridData.length === 0) {
		return null;
	}

	return (
		<tbody className="ru-table">
			{/* Grid 1 and Grid 2 */}
			<tr className="grid-container">
				<RUGrid
					gridNumber={1}
					products={gridData[0]}
					startNumber={0}
					onDiodeClick={onDiodeClick}
					onUnmaskClick={onUnmaskClick}
					activeUnmask={activeUnmask}
					activeDiodeId={activeDiodeId}
				/>
				<RUGrid
					gridNumber={2}
					products={gridData[1]}
					startNumber={40}
					onDiodeClick={onDiodeClick}
					onUnmaskClick={onUnmaskClick}
					activeUnmask={activeUnmask}
					activeDiodeId={activeDiodeId}
				/>
			</tr>

			<tr className="midhalf">
				<td colSpan="8">MIDHALF</td>
			</tr>

			{/* Grid 3 and Grid 4 */}
			<tr className="grid-container">
				<RUGrid
					gridNumber={3}
					products={gridData[2]}
					startNumber={20}
					onDiodeClick={onDiodeClick}
					onUnmaskClick={onUnmaskClick}
					activeUnmask={activeUnmask}
					activeDiodeId={activeDiodeId}
				/>

				<RUGrid
					gridNumber={4}
					products={gridData[3]}
					startNumber={60}
					onDiodeClick={onDiodeClick}
					onUnmaskClick={onUnmaskClick}
					activeUnmask={activeUnmask}
					activeDiodeId={activeDiodeId}
				/>
			</tr>
		</tbody>
	);
};

export default RUTable;
