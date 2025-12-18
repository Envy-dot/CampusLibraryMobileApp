import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Book, TrendingUp } from 'lucide-react-native';
import { BookCard } from '../../components/books/BookCard';
import { mockBooks, mockUser } from '../../constants/mockData';
import { theme } from '../../constants/theme';

export const HomeScreen = ({ navigation }) => {
    const featuredBooks = mockBooks.slice(0, 4);
    const recentBooks = mockBooks.slice(4);

    const renderBookItem = ({ item }) => (
        <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetails', { book: item })}
        />
    );

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.surface]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <View style={styles.greetingContainer}>
                            <Text style={styles.greeting}>Welcome back,</Text>
                            <Text style={styles.name} numberOfLines={1}>{mockUser.name}</Text>
                        </View>
                        <View style={styles.stats}>
                            <Book size={20} color={theme.colors.primary} />
                            <Text style={styles.statsText}>2</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <TrendingUp size={20} color={theme.colors.primary} />
                            <Text style={styles.sectionTitle}>Featured Books</Text>
                        </View>
                        <FlatList
                            data={featuredBooks}
                            renderItem={renderBookItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.list}
                        />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Book size={20} color={theme.colors.primary} />
                            <Text style={styles.sectionTitle}>Recent Additions</Text>
                        </View>
                        <FlatList
                            data={recentBooks}
                            renderItem={renderBookItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.list}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: theme.spacing.md,
        paddingTop: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    greetingContainer: {
        flex: 1,
        minWidth: 0,
    },
    greeting: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: 2,
    },
    name: {
        ...theme.typography.h2,
        fontSize: 20,
        color: theme.colors.text,
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        gap: theme.spacing.xs,
        flexShrink: 0,
    },
    statsText: {
        ...theme.typography.caption,
        color: theme.colors.text,
        fontWeight: '600',
        fontSize: 16,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    sectionTitle: {
        ...theme.typography.h3,
        fontSize: 18,
        color: theme.colors.text,
    },
    list: {
        paddingHorizontal: theme.spacing.md,
    },
});
