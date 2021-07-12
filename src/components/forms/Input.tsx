import React from 'react'
import { Stack, Text, Spacer, Input } from "native-base";
import { useController, Controller } from "react-hook-form";

export default function ControllerFormInput ({ label, keyboardType, control, name }: any)  {
    // console.log({ others })
    const { formState: { errors }, } =  useController({ name, control });

    return (
        <Stack>
            <Text>{label}</Text>
            <Spacer size={2} />
            <Controller
                control={control}
                render={({
                    field: { onChange, onBlur, value },
                }) => (
                    <Input
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        outlineColor={
                            errors[name] ? "red" : ""
                        }
                        variant="rounded"
                        placeholder={label}
                        keyboardType={keyboardType}
                        autoCapitalize={"none"}
                    />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
            />
        </Stack>
    )
}
