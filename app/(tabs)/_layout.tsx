import { images } from "@/constants"
import useAuthStore from "@/store/auth.store"
import { TabBarIconProps } from "@/type"
import cn from "clsx"
import { Redirect, Tabs } from "expo-router"
import React from "react"
import { Image, Text, View } from "react-native"

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View style={{ height: 80 }}>
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingVertical: 10,
        paddingTop: 25,
      }}
    >
      <Image
        source={icon}
        style={{ width: 24, height: 24, marginBottom: 4 }}
        resizeMode="contain"
        tintColor={focused ? "#FE8C00" : "#5D5F6D"}
      />
      <Text
        className={cn(
          "text-sm font-bold w-full text-center",
          focused ? "text-primary" : "text-gray-200"
        )}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ textAlign: "center" }}
      >
        {title}
      </Text>
    </View>
  </View>
)

const TabLayout = () => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Redirect href="/sign-in" />
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          width: "90%",
          alignSelf: "center",
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.home} title="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.search} title="Search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.bag} title="Cart" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={images.person}
              title="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
