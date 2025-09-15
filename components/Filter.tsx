import { Category } from "@/type"
import cn from "clsx"
import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams()
  const [active, setActive] = useState(searchParams.category || "")

  const handlePress = (id: string) => {
    setActive(id)
    if (id === "all") {
      router.setParams({ category: undefined })
    } else {
      router.setParams({ category: id })
    }
  }

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }]

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            handlePress(item.$id)
          }}
          className={cn(
            "px-4 py-2 rounded-full border",
            active === item.$id
              ? "bg-primary border-primary"
              : "bg-white border-gray-300"
          )}
        >
          <Text
            className={cn(
              "text-sm font-medium",
              active === item.$id ? "text-white" : "text-gray-700"
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    >
      *<Text>Filter</Text>
    </FlatList>
  )
}

export default Filter
