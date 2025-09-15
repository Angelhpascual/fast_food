import { appwriteConfig } from "@/lib/appwrite"
import { MenuItem } from "@/type"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { image_url, name, price, rating } = item

  console.log("MenuCard data:", { image_url, name, price, rating })

  // Construir la URL correcta para Appwrite
  const imageUrl = image_url?.startsWith("http")
    ? image_url
    : `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${image_url}/view?project=${appwriteConfig.projectId}`

  return (
    <TouchableOpacity className="bg-white rounded-2xl p-4 shadow-sm min-h-[200px] relative">
      {/* Imagen del producto */}
      <View className="items-center mb-3">
        <Image
          source={{ uri: imageUrl }}
          className="w-24 h-24 rounded-xl"
          resizeMode="cover"
          onError={(error) =>
            console.log("Image load error:", error.nativeEvent.error)
          }
          onLoad={() => console.log("Image loaded successfully for:", name)}
        />
      </View>

      {/* Información del producto */}
      <View className="flex-1">
        <Text
          className="text-base font-semibold text-gray-800 mb-1"
          numberOfLines={2}
        >
          {name}
        </Text>

        <View className="flex-row items-center justify-between mt-auto">
          <Text className="text-lg font-bold text-primary">${price}</Text>

          {rating && (
            <View className="flex-row items-center">
              <Text className="text-yellow-500 text-sm">⭐</Text>
              <Text className="text-sm text-gray-600 ml-1">{rating}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MenuCard
