import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search } from 'lucide-react-native';
import { Input } from '../../components/common/Input';
import { BookCard } from '../../components/books/BookCard';
import { mockBooks } from '../../constants/mockData';
import { theme } from '../../constants/theme';

export const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(mockBooks);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredBooks(mockBooks);
        } else {
            const filtered = mockBooks.filter(
                (book) =>
                    book.title.toLowerCase().includes(query.toLowerCase()) ||
                    book.author.toLowerCase().includes(query.toLowerCase()) ||
                    book.category.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    };

    const renderBookItem = ({ item }) => (
        <View style={styles.bookItem}>
            <BookCard
                book={item}
                onPress={() => navigation.navigate('BookDetails', { book: item })}
            />
        </View>
    );

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.surface]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View style={styles.header}>
                    <Text style={styles.title}>Search Books</Text>
                    <Input
                        placeholder="Search by title, author, or category..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                        icon={<Search size={20} color={theme.colors.textSecondary} />}
                        style={styles.searchInput}
                    />
                </View>

                <FlatList
                    data={filteredBooks}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}>No books found</Text>
                        </View>
                    }
                />
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
        padding: theme.spacing.md,
        paddingTop: theme.spacing.md,
    },
    title: {
        ...theme.typography.h2,
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    searchInput: {
        marginBottom: theme.spacing.md,
    },
    list: {
        paddingHorizontal: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
    },
    bookItem: {
        flex: 1,
        marginBottom: theme.spacing.md,
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxl,
    },
    emptyText: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
});
