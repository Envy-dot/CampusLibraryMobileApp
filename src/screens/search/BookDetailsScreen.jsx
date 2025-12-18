import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Book, User as UserIcon, Calendar } from 'lucide-react-native';
import { Button } from '../../components/common/Button';
import { theme } from '../../constants/theme';

export const BookDetailsScreen = ({ route, navigation }) => {
    const { book } = route.params;
    const [reserved, setReserved] = useState(false);

    const handleReserve = () => {
        setReserved(true);
        setTimeout(() => {
            navigation.goBack();
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: book.coverImage }} style={styles.coverImage} />
            <BlurView intensity={90} tint="dark" style={styles.overlay} />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>{book.title}</Text>
                    <View style={styles.meta}>
                        <View style={styles.metaItem}>
                            <UserIcon size={16} color={theme.colors.textSecondary} />
                            <Text style={styles.metaText}>{book.author}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Book size={16} color={theme.colors.textSecondary} />
                            <Text style={styles.metaText}>{book.category}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{book.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Availability</Text>
                    <View style={styles.availability}>
                        <View style={styles.availabilityItem}>
                            <Text style={styles.availabilityLabel}>Total Copies</Text>
                            <Text style={styles.availabilityValue}>{book.totalCopies}</Text>
                        </View>
                        <View style={styles.availabilityItem}>
                            <Text style={styles.availabilityLabel}>Available</Text>
                            <Text style={[
                                styles.availabilityValue,
                                { color: book.available ? theme.colors.success : theme.colors.error }
                            ]}>
                                {book.availableCopies}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <View style={styles.details}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>ISBN</Text>
                            <Text style={styles.detailValue}>{book.isbn}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title={reserved ? 'Reserved!' : book.available ? 'Reserve Book' : 'Unavailable'}
                    onPress={handleReserve}
                    disabled={!book.available || reserved}
                    loading={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    coverImage: {
        position: 'absolute',
        width: '100%',
        height: 400,
        top: 0,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: 400,
        top: 0,
    },
    content: {
        flex: 1,
        marginTop: 300,
    },
    header: {
        padding: theme.spacing.lg,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    meta: {
        gap: theme.spacing.sm,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    metaText: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    section: {
        padding: theme.spacing.lg,
        paddingTop: 0,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    description: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        lineHeight: 24,
    },
    availability: {
        flexDirection: 'row',
        gap: theme.spacing.lg,
    },
    availabilityItem: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    availabilityLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    availabilityValue: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    details: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
    },
    detailLabel: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    detailValue: {
        ...theme.typography.body,
        color: theme.colors.text,
        fontWeight: '600',
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
});
