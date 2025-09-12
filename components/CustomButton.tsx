import { CustomButtonProps } from "@/type"
import cn from "clsx"
import React from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn("custom-btn", style)} onPress={onPress}>
      {leftIcon}
      <View>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white font-bold">{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton
