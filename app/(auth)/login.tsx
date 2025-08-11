import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import useSignIn from "../../libs/hooks/useSignIn";

export default function Login() {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);
  const theme = useTheme();
  const { form, onSubmit, loading } = useSignIn();
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "android" ? "padding" : undefined}
          keyboardVerticalOffset={80}
        >
          <View style={styles.inner}>
            <Image
              source={require("../../assets/logo/logo.png")}
              style={styles.image}
            />
            <Text variant="headlineMedium" style={styles.title}>
              Welcome back
            </Text>
            <Text variant="headlineMedium" style={styles.description}>
              Sign In to Your Student Account
            </Text>

            <Controller
              control={form.control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Password"
                  secureTextEntry={hidePassword}
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                  right={
                    <TextInput.Icon
                      icon={hidePassword ? "eye-off" : "eye"}
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  }
                />
              )}
            />

            <Button
              mode="contained"
              style={styles.button}
              onPress={form.handleSubmit(onSubmit)}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Text style={styles.note}>
              Don’t have an account?{" "}
              <Text
                style={{ color: theme.colors.primary }}
                onPress={() => router.push("/(auth)/register")}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginBottom: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 18,
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 19,
    alignSelf: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
    backgroundColor: "#1F44FF",
  },
  note: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
});
