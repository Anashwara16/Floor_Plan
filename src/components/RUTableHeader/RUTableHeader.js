import React from "react";
import "./RUTableHeader.css";

const RUTableHeader = () => {
	return (
		<thead className="ru-header-container">
			<tr className="ru-header-title">
				<th colSpan="9">TAPE-IN DB VIEW </th>
			</tr>
			<tr className="ru-table-header">
				<th className="ru-header-cell">Grid</th>
				<th className="ru-header-cell">Diode</th>
				<th className="ru-header-cell">Unmask</th>
				<th className="ru-header-cell">RU#</th>
				<th className="ru-seat-cell">Seat UUID</th>
				<th className="ru-header-cell">RU#</th>
				<th className="ru-header-cell">Unmask</th>
				<th className="ru-header-cell">Diode</th>
				<th className="ru-header-cell">Grid</th>
			</tr>
		</thead>
	);
};

export default RUTableHeader;
