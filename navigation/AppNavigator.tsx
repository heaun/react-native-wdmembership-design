import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MainScreen } from "../src/screens/MainScreen";
import { BenefitsScreen } from "../src/screens/BenefitsScreen";
import { ProfileScreen } from "../src/screens/ProfileScreen";
import { MembershipCardScreen } from "../src/screens/MembershipCardScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Schedule") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "MembershipCard") {
              iconName = focused ? "card" : "card-outline";
            } else if (route.name === "MyService") {
              iconName = focused ? "settings" : "settings-outline";
            } else {
              iconName = "help-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2B2B2B",
          tabBarInactiveTintColor: "#505866",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#EFF1F3",
            borderTopWidth: 1,
            paddingBottom: 20,
            paddingTop: 8,
            height: 56
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "400"
          }
        })}
      >
        <Tab.Screen
          name="Home"
          component={MainScreen}
          options={{
            title: "홈"
          }}
        />
        <Tab.Screen
          name="Schedule"
          component={BenefitsScreen}
          options={{
            title: "나의일정"
          }}
        />
        <Tab.Screen
          name="MembershipCard"
          component={MembershipCardScreen}
          options={{
            title: "멤버쉽카드"
          }}
        />
        <Tab.Screen
          name="MyService"
          component={ProfileScreen}
          options={{
            title: "마이서비스"
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
