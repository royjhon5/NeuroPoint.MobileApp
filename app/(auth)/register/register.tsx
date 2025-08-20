import { BranchDto } from "@/types/DTO/BranchDTO";
import { router } from "expo-router";
import React, { useState } from "react";

import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Card, TextInput } from "react-native-paper";
interface SignUpFormProps {
  isPartner: boolean;
  branchOptions: BranchDto[];
  details: any;
  setSelectedBranchId: (branchId: number) => void;
  isFormValid: () => boolean;
  isPasswordInvalid: () => boolean;
}

const SignUpForm = ({ isPartner, branchOptions }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branchId, setBranchId] = useState<number | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20} // scroll a bit more so the input isn't flush against keyboard
        keyboardOpeningTime={0}
      >
        <Card style={styles.card}>
          <Card.Content>
            {!isPartner ? (
              <>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join us as a Student</Text>
              </>
            ) : (
              <>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join us as a Student</Text>
              </>
            )}

            {/* First Name */}
            <TextInput
              label="First Name"
              left={<TextInput.Icon icon="account-circle" />}
              mode="outlined"
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />

            {/* Last Name */}
            <TextInput
              label="Last Name"
              left={<TextInput.Icon icon="account-circle" />}
              mode="outlined"
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />

            {/* Mobile Number */}
            <TextInput
              label="Mobile Number"
              left={<TextInput.Icon icon="phone" />}
              mode="outlined"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />

            {/* Address */}
            <TextInput
              label="Address"
              left={<TextInput.Icon icon="location-on" />}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />

            {/* Email */}
            <TextInput
              label="Email"
              left={<TextInput.Icon icon="email" />}
              mode="outlined"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            {/* Branch Select */}
            <Dropdown
              data={branchOptions}
              style={[styles.dropdown]}
              labelField="name"
              valueField="id"
              placeholder="Select Branch"
              value={branchId}
              onChange={(item) => setBranchId(item.id)}
            />
            {/* Password */}
            <TextInput
              label="Password"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "visibility" : "visibility-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              mode="outlined"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            {/* Confirm Password */}
            <TextInput
              label="Confirm Password"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "visibility" : "visibility-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              mode="outlined"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {/* Sign Up Button */}
            <Button
              mode="contained"
              style={styles.signupBtn}
              onPress={() => {
                const formData = {
                  firstName,
                  lastName,
                  mobileNumber,
                  address,
                  email,
                  password,
                  confirmPassword,
                  branchId,
                };
                router.push({
                  pathname: "/(auth)/register/packagetSelection",
                  params: { formData: JSON.stringify(formData) },
                });
              }}
            >
              SIGN UP
            </Button>

            {/* Link to sign in */}
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.signinLink}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  card: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
  },
  branchOption: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginVertical: 4,
  },
  signupBtn: {
    marginTop: 16,
    paddingVertical: 6,
  },
  signinLink: {
    marginTop: 12,
    color: "#0241BE",
    textAlign: "center",
    fontWeight: "500",
  },
  logo: {
    width: 200,
    height: 120,
    alignSelf: "center",
    marginBottom: 16,
  },
  bookImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginVertical: 16,
  },
  shopButton: {
    backgroundColor: "#BE3144",
    borderRadius: 10,
    width: 200,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginBottom: 5,
  },
});
