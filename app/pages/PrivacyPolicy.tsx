import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Card, Divider, Icon } from "react-native-paper";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView
      className="flex flex-col"
      style={{ flex: 1, paddingBottom: 50, backgroundColor: "#FFFFFF" }}
    >
      <View className="bg-blue-500 p-6 flex flex-col">
        <Text className="text-2xl text-white">Privacy Policy</Text>
        <Text className=" text-white">Effective Date: August 8, 2025</Text>
      </View>

      <ScrollView>
        <View className="p-5">
          <Card style={{ backgroundColor: "white" }}>
            <Card.Content>
              <View className="flex flex-col gap-2">
                <Text style={{ textAlign: "justify" }}>
                  NeuroPoint values your privacy and is committed to protecting
                  your personal information. This Privacy Policy outlines how we
                  collect, use, store, and safeguard the data you provide when
                  using our services, including NeuroPoint online courses and
                  tutorials. By accessing our website or using our services, you
                  agree to the terms described in this policy.
                </Text>
                <View className="flex flex-row gap-2 items-center">
                  <Icon source="shield-outline" size={14} color="blue" />
                  <Text className="text-lg font-bold">
                    1. Information We Collect
                  </Text>
                </View>
                <Divider />
                <Text>We may collect the following types of information:</Text>
                <View className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col">
                  <Text className="font-semibold text-gray-800 mb-3">
                    Personal Information
                  </Text>
                  <Text>
                    Your name, email address, contact number, date of birth,
                    billing details, and any other data you voluntarily provide.
                  </Text>
                </View>
                <View className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col">
                  <Text className="font-semibold text-gray-800 mb-3">
                    Account Information
                  </Text>
                  <Text>
                    Login credentials, profile picture, and learning
                    preferences.
                  </Text>
                </View>
                <View className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col">
                  <Text className="font-semibold text-gray-800 mb-3">
                    Payment Information
                  </Text>
                  <Text>
                    Credit card details, banking information, or payment
                    transaction data (processed through secure third-party
                    payment gateways).
                  </Text>
                </View>

                <View className="flex flex-row gap-2 items-center">
                  <Icon source="cog-outline" size={14} color="blue" />
                  <Text className="text-lg font-bold">
                    2. Information We Collect
                  </Text>
                </View>
                <Divider />
                <View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>
                      Provide and improve NeuroPoint online courses and
                      tutorials
                    </Text>
                  </View>
                </View>
                <View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>Process payments and manage your account</Text>
                  </View>
                </View>
                <View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>
                      Communicate important updates and course reminders
                    </Text>
                  </View>
                </View>
                <View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>Personalize your learning experience</Text>
                  </View>
                </View>
                <View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>Maintain platform security</Text>
                  </View>
                </View>
                <View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>Comply with legal obligations</Text>
                  </View>
                </View>

                <View className="flex flex-row gap-2 items-center">
                  <Icon source="lock-outline" size={14} color="blue" />
                  <Text className="text-lg font-bold">3. Your Rights</Text>
                </View>
                <Divider />

                <View className="bg-blue-50 p-5 rounded-xl flex flex-col gap-2">
                  <Text>You have the right to:</Text>
                  <View>
                    <View className="flex flex-row items-center">
                      <Icon source="circle-small" size={20} color="blue" />
                      <Text>Access your personal data</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Icon source="circle-small" size={20} color="blue" />
                      <Text>Request corrections or updates</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Icon source="circle-small" size={20} color="blue" />
                      <Text>Request account deletion</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Icon source="circle-small" size={20} color="blue" />
                      <Text>Withdraw consent </Text>
                    </View>
                  </View>
                </View>

                <View className="flex flex-row gap-2 items-center">
                  <Icon source="lock-outline" size={14} color="blue" />
                  <Text className="text-lg font-bold">
                    4. Data Storage and Security
                  </Text>
                </View>
                <Divider />

                <View className="p-2 flex flex-col gap-2">
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>
                      Your personal data is stored on secure servers with
                      encryption and restricted access.
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>
                      Payment transactions are handled by trusted third-party
                      payment processors.
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>
                      We regularly update our systems to protect against
                      unauthorized access, misuse, or disclosure.
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row gap-2 items-center">
                  <Icon source="cog-outline" size={14} color="blue" />
                  <Text className="text-lg font-bold">
                    5. Sharing of Information
                  </Text>
                </View>
                <Divider />

                <View className="flex flex-col gap-2">
                  <Text>
                    We will not sell or rent your personal information. We may
                    share your data only with:
                  </Text>
                </View>

                <View className="p-2 flex flex-col gap-2">
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>
                      <Text className="font-bold">Service Providers</Text>{" "}
                      assisting in payment processing, hosting, analytics, and
                      technical support.
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>
                      <Text className="font-bold">Legal Authorities </Text>if
                      required to comply with legal obligations or protect our
                      rights.
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Icon source="circle-small" size={20} />
                    <Text>
                      <Text className="font-bold">Educational Partners</Text>{" "}
                      who help deliver certain NeuroPoint online courses and
                      tutorials, with strict confidentiality agreements in
                      place.
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row gap-2 items-center">
                  <Icon source="cog-outline" size={14} color="blue" />
                  <Text className="text-lg font-bold">
                    7. Changes to This Policy
                  </Text>
                </View>
                <Divider />
                <Text className="text-justify">
                  We use cookies to enhance your experience, remember your
                  preferences, and track engagement with NeuroPoint online
                  courses and tutorials. You may disable cookies in your
                  browser, but some features may not work as intended.
                </Text>

                <View className="flex flex-row gap-2 items-center">
                  <Icon source="cog-outline" size={14} color="blue" />
                  <Text className="text-lg font-bold">
                    6. Cookies and Tracking
                  </Text>
                </View>
                <Divider />

                <Text className="text-justify">
                  We may update this Privacy Policy from time to time.
                  Significant changes will be announced via email or posted on
                  our website.
                </Text>

                <View className="flex flex-row gap-2 items-center">
                  <Icon source="email-outline" size={14} color="blue" />
                  <Text className="text-lg font-bold">8. Contact Us</Text>
                </View>
                <Divider />
                <Text>For any questions about this Privacy Policy:</Text>
                <View className="flex flex-row items-center gap-2">
                  <Icon source="email-outline" size={20} />
                  <Text>hello@neuropoint.io</Text>
                </View>

                <View className="flex flex-row items-center gap-2">
                  <Icon source="phone-outline" size={20} />
                  <Text>0976 262 4018</Text>
                </View>
                <View className="flex flex-row items-center gap-2">
                  <Icon source="web" size={20} />
                  <Text>www.neuropoint.io</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
