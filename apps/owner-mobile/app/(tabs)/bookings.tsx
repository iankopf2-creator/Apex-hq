import { FlatList, StyleSheet, Text, View } from "react-native";

const STUB_BOOKINGS = [
  { id: "b1", label: "Stub · AC tune-up · Tue 9:00 AM" },
  { id: "b2", label: "Stub · Estimate follow-up · Wed 2:00 PM" },
  { id: "b3", label: "Stub · No live calendar yet" },
];

export default function BookingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bookings (placeholder)</Text>
      <FlatList
        data={STUB_BOOKINGS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.label}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No stub rows</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  rowText: { fontSize: 15 },
});
