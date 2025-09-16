import { useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>()

  const [query, setQuery] = useState(params.query)

  const handleSearch = (text: string) => {}

  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers"
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor="#A0A0A0"
      />
      <TouchableOpacity
        className="pr-5"
        onPress={() => console.log("Search Pressed")}
      >
        JOSEPO DE LA BAHíA NO META LA MANO EN LA COMíA
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar
