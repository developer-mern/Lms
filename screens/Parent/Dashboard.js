import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../Context/authContext";

export default function Dashboard() {
    const { logout } = useAuth();
    return (
        <View>
            <Text>
                Parent Dashboard
            </Text>
            {/* Logout Button */}
            <TouchableOpacity style={{marginTop : 30}} onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}