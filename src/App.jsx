import React, { useState } from "react";
import EMOJI_REGEX from "emojibase-regex";
import data from "emojibase-data/ru/compact.json";

export const App = () => {
	const [encodedText, setEncodedText] = useState("");
	const [decodedText, setDecodedText] = useState("");

	React.useEffect(() => {
		console.log(data);
	}, []);

	const encodeEmoji = (match) => {
		let emojiObj = data.find((obj) => obj.unicode === match);
		if (!emojiObj) return "";
		let hexCode = emojiObj.hexcode;
		let HTMLCode = hexCode.split("-").reduce((acc, cur) => acc + "&#" + parseInt(cur, 16) + ";", "");
		return HTMLCode;
	};

	const onDecodedChange = (event) => {
		setDecodedText(event.target.value);
		let globalEmojiRegex = new RegExp(EMOJI_REGEX, "g");
		let replaced = event.target.value.replace(globalEmojiRegex, encodeEmoji);
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
		<>
			<input
				onChange={onDecodedChange}
				type="text"
				name="emoji-text"
				id="emoji-text"
				value={decodedText}
			/>
			<input
				onChange={onEncodedChange}
				type="text"
				name="coded-text"
				id="coded-text"
				value={encodedText}
			/>
		</>
	);
};
