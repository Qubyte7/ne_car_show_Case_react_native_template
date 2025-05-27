import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native'
import { Image } from 'expo-image'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'
import { router } from 'expo-router';
import { useDeleteCar } from '@/hooks/useCarApis'
import { useToast } from 'react-native-toast-notifications'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width - 32 // 16px padding on each side

export default function CarCard({ id, name, description, rating }: {
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly rating: Float,
}) {
    const { mutate: deleteCar, isPending } = useDeleteCar();
    const toast = useToast();
    //handeling delete car
    const handleDelete = () => {
        Alert.alert(
            "Delete Car",
            `Are you sure you want to delete ${name}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteCar(id, {
                            onSuccess: () => {
                                toast.show("Car deleted successfully", {
                                    type: "success"
                                });
                            },
                            onError: (error) => {
                                toast.show("Failed to delete car", {
                                    type: "danger"
                                });
                                console.error("Error deleting car:", error);
                            }
                        });
                    }
                }
            ]
        );
    };
    return (

        <View className='mb-4 bg-white rounded-xl' style={styles.cardContainer}>
            <View className='p-4'>
                {/* Header Content */}
                <View className='flex-row justify-between items-center mb-3'>
                    <View>
                        <View className='flex-row items-center gap-2'>
                            <Ionicons name='checkmark-circle' size={24} color="#FF7300" />
                            <Text className='font-poppins-bold text-xl'>{name}</Text>
                        </View>
                        <Text className='font-poppins-medium text-lightgray'>{description} {rating}</Text>
                    </View>

                    <View className='flex-row gap-2'>
                        <TouchableOpacity
                            className='rounded-full p-3 bg-primary'
                            onPress={() => router.push('/UpdateCar')}
                        >
                            <Ionicons name='pencil' size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='rounded-full p-3 bg-palered'
                            onPress={handleDelete}
                            disabled={isPending}
                        >
                            <Ionicons
                                name='trash-bin-outline'
                                size={20}
                                color="#fff"
                                style={isPending ? { opacity: 0.5 } : null}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Image Container */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('@/assets/images/car6.png')}
                        contentFit='cover'
                        style={styles.image}
                    />
                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    cardParentContainer: {
        elevation: 5,
    },
    cardContainer: {
        width: CARD_WIDTH,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8.4,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        height: 200, // Fixed height for consistency
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    }
})