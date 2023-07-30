import React from "react";
import { ReactComponent as CopyIcon } from "./assets/copy-icon.svg";
import { ReactComponent as ClearIcon } from "./assets/close-red-icon.svg";
import "./Buttons.css";

export const Buttons = ({ targetRef, setTargetState }) => {
	const onCopyClick = () => {
		if (targetRef.current) {
			navigator.clipboard.writeText(targetRef.current.value);
		}
	};
	const onClearClick = () => {
		setTargetState("");
	};

	return (
		<div className="btn-container">
			<button
				className="btn"
				onClick={onCopyClick}>
				<CopyIcon />
			</button>
			<button
				className="btn"
				onClick={onClearClick}>
				<ClearIcon />
			</button>
		</div>
	);
};
