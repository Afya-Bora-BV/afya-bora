import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { Text } from 'native-base'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 20, marginHorizontal: 5},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 47,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#B0B3C7',
    textAlign: 'center',
    color: "#7065E4",
  },
  focusCell: {
    borderColor: '#979797',
  },
});


interface CodeInputProps {
    value: string
    onChangeCode: (code: string) => void

    /**
     * Number of cells. Default 6
     */
    cellCount?: number
}

export default function CodeInput ({ value, onChangeCode, cellCount: _cellCount }: CodeInputProps) {
    // Setting default cells to 6
    let cellCount = _cellCount || 6

    const ref = useBlurOnFulfill({ value, cellCount  });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue: onChangeCode,
    });

    return (
        <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={onChangeCode}
            cellCount={cellCount}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}: any) => (
            <Text
                key={index}
                fontWeight="500"
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            )}
        />
    );
};