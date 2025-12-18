import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User } from 'lucide-react-native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setIsAuthenticated } = useAuth();

    const handleRegister = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setIsAuthenticated(true);
        }, 1500);
    };

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.surface]}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join our library community</Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                            icon={<User size={20} color={theme.colors.textSecondary} />}
                            style={styles.input}
                        />
                        <Input
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon={<Mail size={20} color={theme.colors.textSecondary} />}
                            style={styles.input}
                        />
                        <Input
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            icon={<Lock size={20} color={theme.colors.textSecondary} />}
                            style={styles.input}
                        />
                        <Input
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            icon={<Lock size={20} color={theme.colors.textSecondary} />}
                            style={styles.input}
                        />

                        <Button
                            title="Create Account"
                            onPress={handleRegister}
                            loading={loading}
                            style={styles.button}
                        />

                        <Button
                            title="Back to Sign In"
                            onPress={() => navigation.goBack()}
                            variant="outline"
                            style={styles.button}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.xxl,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    form: {
        gap: theme.spacing.md,
    },
    input: {
        marginBottom: theme.spacing.sm,
    },
    button: {
        marginTop: theme.spacing.sm,
    },
});
