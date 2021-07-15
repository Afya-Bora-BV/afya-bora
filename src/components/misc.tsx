/**
 * This contains miscellenaous components
 */
import React from "react";
import { Square } from "native-base";

export function IconContainer ({ children }: any) {
	return (
		<Square p={2} backgroundColor="#E7E5FF" borderRadius={8}>
			{children}
		</Square>
	);
};
