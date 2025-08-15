import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, Pressable } from 'react-native';
import { getVeiculo, Veiculo, deleteVeiculo } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
    const { id } = route.params;
    const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadVeiculo() {
            try {
                setLoading(true);
                const res = await getVeiculo(id);
                setVeiculo(res.data);
                setError(false);
            } catch (err) {
                console.error('Erro ao carregar veículo:', err);
                setError(true);
                Alert.alert('Erro', 'Não foi possível carregar os dados do veículo.');
            } finally {
                setLoading(false);
            }
        }

        loadVeiculo();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#16A34A" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (error || !veiculo) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
                <Text style={styles.errorText}>Erro ao carregar dados</Text>
                <Button title="Tentar novamente" onPress={() => navigation.replace('Detail', { id })} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    <Ionicons name="car-outline" size={20} color="#111" /> Detalhes do Veículo
                </Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>PLACA:</Text>
                    <Text style={styles.value}>{veiculo.placa}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>MARCA:</Text>
                    <Text style={styles.value}>{veiculo.marca}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>MODELO:</Text>
                    <Text style={styles.value}>{veiculo.modelo}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>ANO:</Text>
                    <Text style={styles.value}>{veiculo.ano}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>COR:</Text>
                    <Text style={styles.value}>{veiculo.cor}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <Pressable 
                        style={styles.editButton}
                        onPress={() => navigation.navigate('Edit', { id })}
                    >
                        <Ionicons name="create-outline" size={18} color="#FFF" />
                        <Text style={styles.buttonText}>EDITAR</Text>
                    </Pressable>

                    <Pressable 
                        style={styles.deleteButton}
                        onPress={async () => {
                            try {
                                await deleteVeiculo(id);
                                // Navegar de volta para a Home após excluir
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }],
                                });
                            } catch (error) {
                                console.error('Erro ao excluir veículo:', error);
                                Alert.alert('Erro', 'Não foi possível excluir o veículo.');
                            }
                        }}
                    >
                        <Ionicons name="trash-outline" size={18} color="#FFF" />
                        <Text style={styles.buttonText}>EXCLUIR</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8FAFC',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#4B5563',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#4B5563',
        marginVertical: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    label: {
        width: 90,
        fontWeight: 'bold',
        color: '#6B7280',
        fontSize: 14,
    },
    value: {
        flex: 1,
        color: '#111827',
        fontSize: 15,
    },
    buttonsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    editButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    deleteButton: {
        backgroundColor: '#EF4444',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
    }
});
