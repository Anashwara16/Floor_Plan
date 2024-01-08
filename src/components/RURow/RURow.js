import React from "react";
import "./RURow.css";

const RURow = ({
	ruNumber,
	product,
	gridType,
	onDiodeClick,
	onUnmaskClick,
	activeUnmask,
	activeDiodeId,
}) => {
	const handleDiodeClick = () => {
		onDiodeClick(diodeId);
	};

	const handleUnmaskClick = () => {
		onUnmaskClick(product.seatUUID);
	};

	const productClass = `product-${product.seatUUID
		.replace(/\s+/g, "")
		.toLowerCase()}`;

	const diodeId = `${product.seatUUID}-${ruNumber}`;

	return (
		<>
			{gridType === "normal" ? (
				// Layout for 'normal' grid type.
				<>
					<td
						className={activeDiodeId === diodeId ? "active" : "inactive"}
						onClick={handleDiodeClick}>
						{product.diode}
					</td>
					<td
						className={
							activeUnmask === product.seatUUID ? "active-unmask" : "inactive"
						}
						onClick={handleUnmaskClick}>
						{product.unmask}
					</td>
					<td className="ru-num">{ruNumber}</td>
					<td className={productClass}>{product.seatUUID}</td>
					<td className="empty-class-left">{""}</td>
				</>
			) : (
				// Layout for 'reversed' (mirrored) grid type.
				<>
					<td className="empty-class-right">{""}</td>
					<td className={productClass}>{product.seatUUID}</td>
					<td className="ru-num">{ruNumber}</td>
					<td
						className={
							activeUnmask === product.seatUUID ? "active-unmask" : "inactive"
						}
						onClick={handleUnmaskClick}>
						{product.unmask}
					</td>
					<td
						className={activeDiodeId === diodeId ? "active" : "inactive"}
						onClick={handleDiodeClick}>
						{product.diode}
					</td>
				</>
			)}
		</>
	);
};

export default RURow;
