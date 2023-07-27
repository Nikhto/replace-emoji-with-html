import React, { useState } from "react";
import EMOJI_REGEX from "emojibase-regex/emoji-loose";
import data from "emojibase-data/en/compact.json";
import "./App.css";

export const App = () => {
	const [encodedText, setEncodedText] = useState("");
	const [decodedText, setDecodedText] = useState("");

	React.useEffect(() => {
		console.log(EMOJI_REGEX);
	}, []);

	const encodeEmoji = (match) => {
		let HTMLCode = match;
		let emojiObj = data.find((obj) => obj.unicode == match);
		if (emojiObj) {
			let hexCode = emojiObj.hexcode;
			HTMLCode = hexCode.split("-").reduce((acc, cur) => acc + "&#" + parseInt(cur, 16) + ";", "");
		} else {
			HTMLCode = `&#${match.codePointAt(0)};`;
		}
		return HTMLCode;
	};

	const onDecodedChange = (event) => {
		setDecodedText(event.target.value);
		let globalEmojiRegex = new RegExp(EMOJI_REGEX, "g");
		let replaced = event.target.value.replaceAll(globalEmojiRegex, encodeEmoji);
		setEncodedText(replaced);
	};

	const decodeEmoji = (match) => {
		// console.log(match);
		// let emojiObj = data.find((obj) => obj.unicode === match);
		// if (!emojiObj) return "";
		// let hexCode = emojiObj.hexcode;
		// let HTMLCode = hexCode.split("-").reduce((acc, cur) => acc + "&#" + parseInt(cur, 16) + ";", "");
		// return HTMLCode;
	};

	const onEncodedChange = (event) => {
		// let hexcode = event.target.value.replace(/&#(\d+);/, decodeEmoji);
		setEncodedText(event.target.value);
		// let replaced = event.target.value.replace(EMOJI_REGEX, decodeEmoji);
		// setDecodedText(event.target.value);
	};

	return (
		<div className="container">
			<div>
				<h2>Текст с эмоджи</h2>
				<textarea
					onChange={onDecodedChange}
					name="emoji-text"
					id="emoji-text"
					value={decodedText}
					rows="50"
				/>
			</div>
			<div>
				<h2>Текст с кодами</h2>
				<textarea
					onChange={onEncodedChange}
					name="coded-text"
					id="coded-text"
					value={encodedText}
					readOnly
					rows="50"
				/>
			</div>
		</div>
	);
};
