import { View } from "react-native"
import ChampionQuiz from "../components/ChampionQuiz"

const ChampionQuizScreen = ({ route }) => {
    const { quiz } = route.params;

    return (
        <View style={styles.container}>
            <ChampionQuiz quiz = {quiz} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ChampionQuizScreen;