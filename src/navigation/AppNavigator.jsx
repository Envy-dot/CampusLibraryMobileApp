import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, User } from 'lucide-react-native';
import { AuthContext } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { BookDetailsScreen } from '../screens/search/BookDetailsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { theme } from '../constants/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
    </Stack.Navigator>
);

const SearchStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchMain" component={SearchScreen} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
    </Stack.Navigator>
);

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: theme.colors.surface,
                borderTopColor: theme.colors.border,
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                height: 60,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.textSecondary,
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
            },
        }}
    >
        <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
                tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
            }}
        />
        <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
                tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
            }}
        />
    </Tab.Navigator>
);

export const AppNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {!isAuthenticated ? (
                        <Stack.Screen name="Auth" component={AuthStack} />
                    ) : (
                        <Stack.Screen name="Main" component={MainTabs} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};
