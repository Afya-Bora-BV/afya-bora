import React, { Component } from 'react';
import { Stack } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuth } from '../../contexts/AuthContext';
import { useRoute } from '@react-navigation/native';

const PatientCall = () => {
    const { profile } = useAuth()
    const route = useRoute<any>();
    const { url } = route?.params;

    const PATIENT_CALL_DOMAIN = url

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