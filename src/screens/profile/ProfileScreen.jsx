import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Mail, BookOpen, LogOut, Settings } from 'lucide-react-native';
import { mockUser, borrowedBooks } from '../../constants/mockData';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';

export const ProfileScreen = ({ navigation }) => {
    const { setIsAuthenticated } = useAuth();

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const renderSettingItem = ({ icon: Icon, title, onPress }) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.settingLeft}>
                <Icon size={20} color={theme.colors.primary} />
                <Text style={styles.settingText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.surface]}
            style={styles.container}
        >

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Borrowed Books</Text>
                {borrowedBooks.map((book) => (
                    <View key={book.id} style={styles.borrowedBook}>
                        <View style={styles.bookInfo}>
                            <Text style={styles.bookTitle}>{book.title}</Text>
                            <Text style={styles.bookAuthor}>{book.author}</Text>
                            <Text style={styles.dueDate}>Due: {book.dueDate}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                {renderSettingItem({
                    icon: Settings,
                    title: 'Account Settings',
                    onPress: () => { },
                })}
                {renderSettingItem({
                    icon: LogOut,
                    title: 'Logout',
                    onPress: handleLogout,
                })}
            </View>
        </ScrollView>
      </SafeAreaView >
    </LinearGradient >
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
        alignItems: 'center',
        padding: theme.spacing.lg,
        paddingTop: theme.spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: theme.borderRadius.full,
        marginBottom: theme.spacing.md,
        borderWidth: 3,
        borderColor: theme.colors.primary,
    },
    name: {
        ...theme.typography.h2,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    email: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    studentId: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    section: {
        padding: theme.spacing.lg,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    borrowedBook: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        ...theme.typography.body,
        color: theme.colors.text,
        fontWeight: '600',
        marginBottom: theme.spacing.xs,
    },
    bookAuthor: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    dueDate: {
        ...theme.typography.small,
        color: theme.colors.warning,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    settingText: {
        ...theme.typography.body,
        color: theme.colors.text,
    },
});
