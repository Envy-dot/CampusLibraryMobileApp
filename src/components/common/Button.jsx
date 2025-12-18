import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';

export const Button = ({ title, onPress, variant = 'primary', loading = false, disabled = false, style }) => {
    const getColors = () => {
        switch (variant) {
            case 'primary':
                return [theme.colors.primary, theme.colors.primaryDark];
            case 'secondary':
                return [theme.colors.secondary, '#DB2777'];
            case 'outline':
                return ['transparent', 'transparent'];
            default:
                return [theme.colors.primary, theme.colors.primaryDark];
        }
    };

    const content = loading ? (
        <ActivityIndicator color={variant === 'outline' ? theme.colors.primary : '#fff'} />
    ) : (
        <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>{title}</Text>
    );

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[styles.container, style]}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={getColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.gradient,
                    variant === 'outline' && styles.outline,
                    (disabled || loading) && styles.disabled,
                ]}
            >
                {content}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
    },
    gradient: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    outline: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    outlineText: {
        color: theme.colors.primary,
    },
    disabled: {
        opacity: 0.5,
    },
});
