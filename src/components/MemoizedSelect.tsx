import React, { useMemo } from "react";
import { CheckIcon, ISelectProps, Select } from "native-base";
import { setLocation } from "../store/slices/appointment";

type SelectItemField = "key" | "label" | "value";

type Props = ISelectProps & {
	placeholder: string;
	onValueChange: (itemValue: string) => void;
	selectedValue: string;
	options: Array<Record<SelectItemField, string>>;
};

const CustomSelect: React.FC<Props> = ({
	placeholder,
	onValueChange,
	selectedValue,
	options,
	...rest
}) => {
	const renderSelectItems = options.map(({ key, label, value }) => (
		<Select.Item key={key} label={label} value={value} />
	));
	return (
		<Select
			selectedValue={selectedValue}
			minWidth={200}
			renderToHardwareTextureAndroid={true}
			placeholder={placeholder}
			onValueChange={onValueChange}
			{...rest}
		>
			{renderSelectItems}
		</Select>
	);
};

function equalSelectProps(prev: Props, next: Props) {
	return (
		prev.selectedValue === next.selectedValue &&
		prev.placeholder === next.placeholder
	);
}

export default React.memo(CustomSelect, equalSelectProps);
