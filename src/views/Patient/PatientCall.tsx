import React, { Component } from 'react';
import { Stack } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


const PatientCall = () => {
    return (
        <Stack flex={1}>
            <WebView
                source={{ uri: 'https://reactnative.dev/' }}
                style={{
                    flex: 1,
                }}
            />
        </Stack>
    )
}

export default PatientCall