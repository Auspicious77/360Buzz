import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Heading2, BodyText, Button, ConfirmDialog } from '../../src/components';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store';

export default function TeamScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = () => {
        setShowLogoutDialog(true);
    };

    const confirmLogout = async () => {
        setShowLogoutDialog(false);
        await logout();
        router.replace('/(auth)/login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/Buzzlogo2.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Heading2 color="#FFFFFF" style={styles.headerTitle}>Team</Heading2>
            </View>

            <View style={styles.content}>

                <View style={styles.emptyState}>
                    <Heading2 color="#333333" style={styles.emptyTitle}>No Team Members Yet</Heading2>
                    <BodyText color="#999999" align="center" style={styles.emptyText}>
                        Your team members will appear here
                    </BodyText>


                </View>




           
            </View>


                  <View style={{ padding: 30, marginTop: 100 }}>
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    variant="outline"
                    fullWidth
                />
            </View>

           


            <ConfirmDialog
                visible={showLogoutDialog}
                title="Logout"
                message="Are you sure you want to logout?"
                confirmText="Logout"
                cancelText="Cancel"
                type="destructive"
                onConfirm={confirmLogout}
                onCancel={() => setShowLogoutDialog(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        backgroundColor: '#000000',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 30,
        marginBottom: 8,
    },
    headerTitle: {
        marginTop: 4,
    },
    content: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        // marginTop: 100
    },
    emptyState: {
        alignItems: 'center',
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        marginBottom: 8,
    },
    emptyText: {
        lineHeight: 24,
    },
});
