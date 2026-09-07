import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="bookings" options={{ title: "Bookings" }} />
      <Tabs.Screen name="leads" options={{ title: "Leads" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
