import { Text, View } from "react-native";
import { Card, Icon } from "react-native-paper";

const OurSubject = () => {
  return (
    <>
      <View className="flex flex-col items-center justify-center gap-9 p-5">
        <Text className="text-blue-500">OUR SUBJECT</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23, marginTop: 6 }}>
          Programs Designed With Care
        </Text>
        <Text className="text-justify mt-2">
          At NeuroPoint, We Focus On Building Strong Foundations In Essential
          Subjects, While Making Learning Engaging, Gentle, And Structured. Our
          Resources For Programs In English, Math, And Science Are Thoughtfully
          Crafted To Support Diverse Learning Styles—Ensuring Each Child Can
          Explore, Understand, And Grow With Confidence At Their Own Pace.
        </Text>
        <View className="flex flex-col gap-2">
          <Card
            style={{
              width: "100%",
              marginTop: 20,
              padding: 10,
              backgroundColor: "#5F2DED",
            }}
          >
            <Card.Content>
              <Icon source="alpha-e" size={30} color="white" />
              <Text style={{ fontSize: 16, marginTop: 15, color: "white" }}>
                ENGLISH
              </Text>
              <Text style={{ marginTop: 15, fontSize: 16, color: "white" }}>
                Strong Foundation In Reading, Writing, And Communication Skills
                Using Phonetics, Vowel Articulation
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ width: "100%", marginTop: 20, padding: 10 }}>
            <Card.Content>
              <Icon source="calculator-variant-outline" size={30} />
              <Text style={{ fontSize: 16, marginTop: 20 }}>MATH</Text>
              <Text style={{ marginTop: 15, fontSize: 16 }}>
                From Confidence In Numbers, Logic, And Problem-Solving Through
                Explicit Guidance And Step-By-Step Solutions
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ width: "100%", marginTop: 20, padding: 10 }}>
            <Card.Content>
              <Icon source="react" size={30} />
              <Text style={{ fontSize: 16, marginTop: 30 }}>SCIENCE</Text>
              <Text style={{ marginTop: 15, fontSize: 16 }}>
                Spark Curiosity And Critical Thinking With Discovery-Friendly
                Experiences And Engage Real-World Learners
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </>
  );
};

export default OurSubject;
