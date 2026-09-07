import { StyleSheet, Text, View } from "react-native";

const stripeConfigured: boolean | "unknown" = false;

function stripeConfiguredLabel(
  value: boolean | "unknown",
): string {
  if (value === false) return "not configured (stub false)";
  if (value === true) return "configured (stub true)";
  return "unknown";
}

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          DO NOT submit to App Store / Google Play without Ian.
        </Text>
      </View>
      <Text style={styles.label}>Stripe configured</Text>
      <Text style={styles.value}>
        {stripeConfiguredLabel(stripeConfigured)}
      </Text>
      <Text style={styles.note}>
        Phase 0 Settings stub. No secrets stored here. No EAS submit. No auth.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  banner: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  bannerText: {
    color: "#92400e",
    fontWeight: "700",
    fontSize: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },
  value: {
    fontSize: 16,
  },
  note: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 8,
  },
});
