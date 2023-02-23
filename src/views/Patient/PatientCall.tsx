import React, { Component } from 'react';
import { Stack } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuth } from '../../contexts/AuthContext';


const tempoRoomId = "63ecfe3bcd8175701aac03c0"
const tempoName = "George Millanzi"

const PATIENT_CALL_DOMAIN = `https://afyabora.app.100ms.live/preview/${tempoRoomId}/patient?name=${tempoName}`

const getMeetingLink = () => {
    return PATIENT_CALL_DOMAIN
}

const PatientCall = () => {
    const { profile } = useAuth()

    const PATIENT_CALL_DOMAIN = `https://afyabora.app.100ms.live/preview/${tempoRoomId}/patient?name=${profile?.name}`

    return (
        <Stack flex={1}>
            <WebView
                source={{ uri: PATIENT_CALL_DOMAIN }}
                style={{
                    flex: 1,
                }}
            />
        </Stack>
    )
}

export default PatientCall