import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WhyComponent() {
  return (
    <View style={styles.textBlock}>
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>EDUCATION SOLUTION</Text>
      </TouchableOpacity>
      <Text style={styles.whyTitle}>
        Why <Text style={styles.neuro}>Neuro</Text>
        <Text style={styles.point}>Point</Text>?
      </Text>
      <Text style={styles.description}>
        At NeuroPoint, we understand that every child learns differently.
        That&apos;s why we&apos;ve built a safe, inclusive, and flexible online
        learning environment that supports children with unique educational
        needs. Whether your child needs a calmer pace, visual structure, or
        individualized attention, we&apos;re here to help them succeed.
      </Text>

      <View style={styles.containerwhy}>
        <View style={styles.featureRow}>
          <MaterialIcons name="check-circle" size={24} color="blue" />
          <Text style={styles.featureText}>Personalized Learning Plans</Text>
        </View>
        <View style={styles.featureRow}>
          <MaterialIcons name="check-circle" size={24} color="blue" />
          <Text style={styles.featureText}>Interactive, Visual Lessons</Text>
        </View>
        <View style={styles.featureRow}>
          <MaterialIcons name="check-circle" size={24} color="blue" />
          <Text style={styles.featureText}>Sensory-Friendly Environment</Text>
        </View>
        <View style={styles.featureRow}>
          <MaterialIcons name="check-circle" size={24} color="blue" />
          <Text style={styles.featureText}>Parent & Teacher Collaboration</Text>
        </View>
        <View style={styles.featureRow}>
          <MaterialIcons name="check-circle" size={24} color="blue" />
          <Text style={styles.featureText}>
            Inclusive and Compassionate Community
          </Text>
        </View>
        <View style={styles.featureRow}>
          <MaterialIcons name="check-circle" size={24} color="blue" />
          <Text style={styles.featureText}>
            Integrating AI for More Adaptive Learning Experience
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileCircle: {
    width: 30,
    height: 30,
    backgroundColor: "#ddd",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontWeight: "bold",
    color: "#333",
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  ctaButton: {
    alignSelf: "center",
    backgroundColor: "#ff3d3d",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
    marginVertical: 10,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textBlock: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  whyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  neuro: {
    color: "#1c5eff",
  },
  point: {
    color: "#f43b3b",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 14,
  },
  containerwhy: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});
