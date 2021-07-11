import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Box, HStack, ScrollView, ZStack } from "native-base";

const FindFacility: React.FC = () => {
    return (
        <View style={styles.container}>
            <MapView

                style={styles.map}
                initialRegion={{
                    latitude: -3.386319234144578,
                    longitude: 36.6806454883112,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: -3.386319234144578, longitude: 36.6806454883112 }}
                    title="Demo hospital"
                    description="Demo description"
                />
            </MapView>
            <Box h={56}  position="absolute" w="100%" zIndex={2} bottom={0} >
                <ScrollView horizontal={true} contentContainerStyle={{ alignItems: "center", paddingHorizontal: 10 }} height="100%">

                    {[...new Array(4)].map(el => (
                        <Box h={48} w={48} borderRadius={6} shadow={2} mx={2} backgroundColor="white">
                        </Box>
                    ))}

                </ScrollView>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default FindFacility