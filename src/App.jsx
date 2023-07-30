import React, { useEffect, useState } from "react";
import EMOJI_REGEX from "emojibase-regex/emoji-loose";
import data from "emojibase-data/en/compact.json";
import "./App.css";

export const App = () => {
	const [encodedText, setEncodedText] = useState("");
	const [decodedText, setDecodedText] = useState("");

	const findEmoji = (codes, rest) => {
		if (codes.length === 0) return "";
		let hex = codes.reduce((acc, cur) => acc + "-" + parseInt(cur).toString(16).toUpperCase(), "").slice(1);
		let foundEmoji = data.find((obj) => obj.hexcode === hex);
		if (!foundEmoji && !rest) return codes.reduce((acc, cur) => acc + "&#" + parseInt(cur, 16) + ";", "");
		if (foundEmoji && !rest) return foundEmoji.unicode;
		if (foundEmoji && rest) return foundEmoji.unicode + findEmoji(rest, []);
		rest.unshift(...codes.slice(-1));
		return findEmoji(codes.slice(0, -1), rest);
	};

	const decodeEmoji = (match) => {
		let codes = match.slice(1).slice(1, -1).split(";&#");
		return findEmoji(codes, []);
	};

	useEffect(() => {
		let replaced = encodedText.replaceAll(/(&#\d+;)+/g, decodeEmoji);
		setDecodedText(replaced);
	}, [encodedText]);

	useEffect(() => {
		let globalEmojiRegex = new RegExp(EMOJI_REGEX, "g");
		let replaced = decodedText.replaceAll(globalEmojiRegex, encodeEmoji);
		setEncodedText(replaced);
	}, [decodedText]);

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
	};

	const onEncodedChange = (event) => {
		setEncodedText(event.target.value);
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
					rows="50"
				/>
			</div>
		</div>
	);
};
