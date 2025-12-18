import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export const Input = ({ placeholder, value, onChangeText, secureTextEntry, icon, style, ...props }) => {
    return (
        <View style={[styles.container, style]}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <TextInput
                style={[styles.input, icon && styles.inputWithIcon]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textSecondary}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.md,
        minHeight: 50,
    },
    iconContainer: {
        marginRight: theme.spacing.sm,
    },
    input: {
        flex: 1,
        color: theme.colors.text,
        fontSize: 16,
        paddingVertical: theme.spacing.sm,
    },
    inputWithIcon: {
        paddingLeft: 0,
    },
});
