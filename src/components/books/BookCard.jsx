import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { theme } from '../../constants/theme';

export const BookCard = ({ book, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
            <Image source={{ uri: book.coverImage }} style={styles.cover} />
            <BlurView intensity={80} tint="dark" style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {book.title}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                    {book.author}
                </Text>
                <View style={styles.footer}>
                    <View style={[styles.badge, book.available ? styles.available : styles.unavailable]}>
                        <Text style={styles.badgeText}>
                            {book.available ? `${book.availableCopies} Available` : 'Unavailable'}
                        </Text>
                    </View>
                </View>
            </BlurView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 240,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        marginRight: theme.spacing.md,
    },
    cover: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    info: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing.md,
        overflow: 'hidden',
    },
    title: {
        ...theme.typography.h3,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    author: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
    },
    available: {
        backgroundColor: theme.colors.success + '40',
    },
    unavailable: {
        backgroundColor: theme.colors.error + '40',
    },
    badgeText: {
        ...theme.typography.small,
        color: theme.colors.text,
        fontWeight: '600',
    },
});
