import { SafeAreaView, StatusBar } from "react-native";
import { Text, Button } from "react-native-elements";

import { useTheme } from "../hooks";

export function RootNavigation() {
    const { darkMode, toggleTheme } = useTheme()
    // console.log(useTheme());

    return (
        <>
            <StatusBar animated barStyle={darkMode ? "light-content" : "dark-content"} />

            <SafeAreaView>
                <Text>We are in RootNavigation.js</Text>
                <Text>Theme: {darkMode ? "DarkMode" : "LightMode"}</Text>

                <Button
                    title={darkMode ? "Cambiar a LightMode" : "Cambiar a DarkMode"}
                    onPress={toggleTheme}
                ></Button>
            </SafeAreaView>
        </>
    )
}