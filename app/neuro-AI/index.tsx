import httpHelper from "@/libs/api/httpAxios";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import HTML from "react-native-render-html";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "", text: "", sender: "bot" },
  ]);
  const { width } = useWindowDimensions();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
    };

    setMessages((prev) => [userMessage, ...prev]);
    setInput("");

    try {
      const response = await httpHelper.get("/Chat", {
        params: { message: input },
        headers: {
          Accept: "text/plain",
          "User-Agent": "Mozilla/5.0",
        },
        transformResponse: [(data) => data],
      });

      const botText = response.data;
      console.log("Bot response:", botText);
      const botMessage = {
        id: Date.now().toString() + "-bot",
        text: botText,
        sender: "bot",
      };

      setMessages((prev) => [botMessage, ...prev]);
    } catch (error) {
      console.error("Bot fetch failed:", error);
      setMessages((prev) => [
        {
          id: Date.now().toString() + "-error",
          text: "❌ No reply. Please try again.",
          sender: "bot",
        },
        ...prev,
      ]);
    }
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "android" ? "padding" : undefined}
          keyboardVerticalOffset={80}
        >
          {messages.length === 0 ||
          (messages.length === 1 && messages[0].sender === "bot") ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>How can I help you today?</Text>
              <Text style={styles.emptySubText}>Start a new message...</Text>
            </View>
          ) : (
            <FlatList
              inverted
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageBubble,
                    item.sender === "me" ? styles.myBubble : styles.botBubble,
                  ]}
                >
                  {item.sender === "bot" &&
                  /<\/?[a-z][\s\S]*>/i.test(item.text) ? (
                    <HTML
                      contentWidth={width}
                      source={{ html: item.text }}
                      baseStyle={{ color: "#000", fontSize: 16 }}
                    />
                  ) : (
                    <Text
                      style={{ color: item.sender === "me" ? "#fff" : "#000" }}
                    >
                      {item.text}
                    </Text>
                  )}
                </View>
              )}
              contentContainerStyle={{ padding: 10 }}
            />
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message"
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={{ color: "#fff" }}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 10,
    marginBottom: 8,
  },
  myBubble: {
    backgroundColor: "#0084ff",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#eee",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0084ff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  emptySubText: {
    fontSize: 16,
    color: "#888",
  },
});
