import { FlatList, StyleSheet, Text, View } from "react-native";

const FIXTURE_LEADS = [
  { id: "l1", name: "Fixture · Jordan M.", source: "Free Audit" },
  { id: "l2", name: "Fixture · Sam R.", source: "Booking form" },
  { id: "l3", name: "Fixture · Alex P.", source: "Call log stub" },
];

export default function LeadsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leads (fixture data)</Text>
      <FlatList
        data={FIXTURE_LEADS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.source}>{item.source}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No fixture rows</Text>}
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
    gap: 4,
  },
  name: { fontSize: 15, fontWeight: "500" },
  source: { fontSize: 13, opacity: 0.65 },
});
