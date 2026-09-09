import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#e43232",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#e43232",
        },
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="matches" options={{ title: "History" }} />
      <Tabs.Screen name="summary" options={{ title: "Summary" }} />
    </Tabs>
  );
}
