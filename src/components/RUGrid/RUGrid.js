import React from "react";
import RURow from "../RURow/RURow";
import "./RUGrid.css";

const RUGrid = ({
	gridNumber,
	products,
	startNumber,
	onDiodeClick,
	onUnmaskClick,
	activeUnmask,
	activeDiodeId,
}) => {
	// Grid type based on grid number. Render them as 'normal' or 'reversed' (mirrored grid).
	const gridType = gridNumber === 1 || gridNumber === 3 ? "normal" : "reversed";
	const isReversed = gridType === "reversed";
	const gridClass = `grid-cell-${gridNumber}`;

	return (
		<td className="grid-container">
			<table className="grid-table">
				<tbody className="grid-body">
					{products.map((product, index) => (
						<tr
							key={`${gridNumber}-${index}`}
							className=""
							border="0"
							cellSpacing="0"
							cellPadding="0">
							{!isReversed && index === 0 && (
								<td rowSpan="20" className={gridClass} border="10">
									{gridNumber}
								</td>
							)}
							<RURow
								rowIndex={index}
								ruNumber={startNumber + index}
								product={product}
								gridType={gridType}
								onDiodeClick={onDiodeClick}
								onUnmaskClick={onUnmaskClick}
								activeUnmask={activeUnmask}
								activeDiodeId={activeDiodeId}
							/>

							{isReversed && index === 0 && (
								<td rowSpan="20" className={gridClass}>
									{gridNumber}
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</td>
	);
};

export default RUGrid;
