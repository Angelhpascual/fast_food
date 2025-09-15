import useAuthStore from "@/store/auth.store"
import * as Sentry from "@sentry/react-native"
import { useFonts } from "expo-font"
import { Redirect, Slot, SplashScreen } from "expo-router"
import { useEffect } from "react"
import { Text, View } from "react-native"
import "./globals.css"
Sentry.init({
  dsn: "https://262e8cccdde593d04a99af20eecd5f33@o4510006011887617.ingest.de.sentry.io/4510006016278608",
})

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  })

  const { isAuthenticated, isLoading, fetchAuthenticatedUser } = useAuthStore()

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  useEffect(() => {
    fetchAuthenticatedUser()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />
  }
  return <Slot />
})
