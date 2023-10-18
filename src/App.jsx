import React, { useEffect, useRef, useState } from "react";
import EMOJI_REGEX from "emojibase-regex/emoji-loose";
import data from "emojibase-data/en/compact.json";
import "./App.css";
import { Buttons } from "./Buttons";

export const App = () => {
	const [encodedText, setEncodedText] = useState("");
	const [decodedText, setDecodedText] = useState("");

	const decodedRef = useRef();
	const encodedRef = useRef();

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
		let result = "";
		// Удаление Low Surrogate символов (DC00 — DFFF)
		for (let i = 0; i < match.length; i++)
			if (!(56320 <= match.codePointAt(i) && match.codePointAt(i) <= 57343)) result += `&#${match.codePointAt(i)};`;
		return result;
	};

	const onDecodedChange = (event) => {
		setDecodedText(event.target.value);
	};

	const onEncodedChange = (event) => {
		setEncodedText(event.target.value);
	};

	return (
		<>
			<div className="container">
				<div>
					<h2>Текст с эмоджи</h2>
					<div className="textContainer">
						<textarea
							onChange={onDecodedChange}
							ref={decodedRef}
							name="emoji-text"
							id="emoji-text"
							value={decodedText}
							rows="50"
						/>
						<Buttons
							targetRef={decodedRef}
							setTargetState={setDecodedText}
						/>
					</div>
				</div>
				<div>
					<h2>Текст с кодами</h2>
					<div className="textContainer">
						<textarea
							onChange={onEncodedChange}
							ref={encodedRef}
							name="coded-text"
							id="coded-text"
							value={encodedText}
							rows="50"
						/>
						<Buttons
							targetRef={encodedRef}
							setTargetState={setEncodedText}
						/>
					</div>
				</div>
			</div>
			<div className="gitlink">
				<a
					href="https://github.com/Nikhto/replace-emoji-with-html"
					target="_blank">
					Код на Github
				</a>
			</div>
		</>
	);
};
