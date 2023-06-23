import React, { useState, useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text, Tab, TabView } from 'react-native-elements'
import { useFocusEffect } from "@react-navigation/native";

import { User as UserController } from "../../api";
import { useAuth } from "../../hooks";
import { Account } from "../../components/Account";

const userController = new UserController();

export function AccountScreen(props) {
    const { navigation } = props;
    const [tabActive, setTabActive] = useState(0);
    const [user, setUser] = useState(null)
    const { accessToken } = useAuth();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    const response = await userController.me(accessToken);
                    navName = response.first_name + " " + response.last_name
                    navigation.setOptions({title: navName})
                    setUser(response)
                } catch (error) {
                    console.error(error);
                }
            })()
        }, [],)
    )

    // do not show nothing until now what user is
    if (!user) return null;

    return (
        <ScrollView>
            <Account.Header avatar={user.avatar} username={user.username} />
            <Account.Follows idUser={user.id} />
            
            <Text>Settings</Text>
            <Text>User Info</Text>

            <Tab
                value={tabActive}
                onChange={e => setTabActive(e)}
                indicatorStyle={styles.tab__indicator}
            >
                <Tab.Item
                    containerStyle={styles.tab__item_container}
                    icon={{ type: "material-community", name: "grid" }}
                />
                <Tab.Item
                    containerStyle={styles.tab__item_container}
                    icon={{ type: "material-community", name: "heart" }}
                />
            </Tab>

            <TabView
                value={tabActive}
                onChange={setTabActive}
                animationType='spring'
            >
                <TabView.Item>
                    <Text>Videos subidos</Text>
                </TabView.Item>
                <TabView.Item>
                    <Text>Videos Favoritos</Text>
                </TabView.Item>
            </TabView>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tab__indicator: {
        backgroundColor: "#fff"
    },
    tab__item_container: {
        backgroundColor: "transparent"
    }
})