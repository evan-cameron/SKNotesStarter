import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw, { useDeviceContext } from "twrnc";
import { Provider } from "react-redux";
import { store } from "./store";
import MasonryList from "@react-native-seoul/masonry-list";

// database links
import {
  useFetchNotesQuery,
  useSearchNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "./db";

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { data: searchData, error, isLoading } = useSearchNotesQuery(searchQuery); // Fetch notes based on search query
  const [deleteNote] = useDeleteNoteMutation();
  const [selectedNote, setSelectedNote] = useState(null);

  // Handle delete button press - sets the selected note for modal
  const handleDeleteNote = (item) => {
    setSelectedNote(item); // Set selected note for modal
  };

  // Confirm deletion of the selected note
  const confirmDeleteNote = () => {
    deleteNote(selectedNote);
    setSelectedNote(null);
  };

  // Fixed background color and other styles
  const backgroundColor = 'bg-blue-900';
  const textColor = 'text-white';
  const borderColor = 'border-white';
  const headerBackgroundColor = '#1E3A8A'; // Use a valid hex color for the header background
  const headerTextColor = '#FFFFFF';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: headerBackgroundColor, borderBottomWidth: 0 },
      headerTintColor: headerTextColor,
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={tw`w-full mb-2 px-1`}>
      <View style={tw`${backgroundColor} rounded-lg p-3 border border-dashed ${borderColor}`}>
        <TouchableOpacity onPress={() => navigation.navigate("View", { data: item })}>
          <Text style={tw`font-bold ${textColor}`}>{item.title}</Text>
          <Text style={tw`${textColor}`}>{item.content}</Text>
        </TouchableOpacity>
        <View style={tw`flex-row justify-end mt-2`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit", { data: item })}
            style={tw`${backgroundColor} px-2 py-1 rounded mr-2 mt-4 border border-dashed ${borderColor}`}
          >
            <Text style={tw`${textColor}`}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteNote(item)}
            style={tw`${backgroundColor} px-2 py-1 rounded mt-4 border border-dashed ${borderColor}`}
          >
            <Text style={tw`${textColor}`}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={tw`flex-row justify-between items-center p-6 ${backgroundColor} h-full`}>
      <TextInput
        style={tw`h-12 border border-dashed ${borderColor} rounded-lg px-4 w-5/6 ${textColor}`}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search..."
        placeholderTextColor='white' // Fixed placeholder color
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={tw`${backgroundColor} rounded-full w-12 h-12 items-center justify-center border ${borderColor}`}
      >
        <Text style={tw`text-3xl ${textColor}`}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 items-center ${backgroundColor} relative`}>
      <View style={tw`w-full h-full`}>
        <View style={tw`h-[85%] w-[98%] mx-auto`}>
          {/* Display the list of notes if searchData is available */}
          {searchData && (
            <MasonryList
              style={tw`px-0.5 pt-0.5 pb-20`}
              data={searchData}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`px-2`}
            />
          )}
        </View>
        <View style={tw`h-[15%] w-full`}>
          {/* Render the footer */}
          {renderFooter()}
        </View>
      </View>
      <Modal
        transparent={true}
        visible={selectedNote !== null}
        animationType="slide"
        onRequestClose={() => setSelectedNote(null)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`w-4/5 bg-white p-6 rounded-lg`}>
            <Text style={tw`text-lg mb-4`}>
              Are you sure you want to delete this note?
            </Text>
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                onPress={() => setSelectedNote(null)}
                style={tw`mr-4`}
              >
                <Text style={tw`text-gray-800`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDeleteNote}>
                <Text style={tw`text-gray-800`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function AddScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [addNote, { data: addNoteData }] = useAddNoteMutation();
  const navigation = useNavigation();

  useEffect(() => {
    if (addNoteData) {
      navigation.navigate("Home");
    }
  }, [addNoteData, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#1E3A8A', borderBottomWidth: 0 },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation]);

  const saveNote = () => {
    addNote({
      title,
      content,
    });
  };

  const handleSaveNote = () => {
    if (!title.trim() || !content.trim()) {
      setIsConfirmModalVisible(true);
    } else {
      saveNote();
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-blue-900`}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={tw`h-12 p-2 bg-blue-900 rounded-lg mb-4 border border-dashed border-white text-white`}
        placeholderTextColor='white'
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        style={tw`h-48 p-2 bg-blue-900 rounded-lg mb-4 border border-dashed border-white text-white`}
        multiline
        placeholderTextColor='white'
      />
      <View style={tw`flex-row justify-end`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-blue-900 p-4 rounded-lg border border-white mr-4 w-24`}
        >
          <Text style={tw`text-white text-center`}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSaveNote}
          style={tw`bg-blue-900 p-4 rounded-lg border border-white w-24`}
        >
          <Text style={tw`text-white text-center`}>Save Note</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isConfirmModalVisible}
        animationType="slide"
        onRequestClose={() => setIsConfirmModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`w-4/5 bg-white p-6 rounded-lg`}>
            <Text style={tw`text-lg mb-4`}>
             Are you sure you want to save a blank note?
            </Text>
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                onPress={() => setIsConfirmModalVisible(false)}
                style={tw`mr-4`}
              >
                <Text style={tw`text-gray-800`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  saveNote();
                  setIsConfirmModalVisible(false);
                }}
              >
                <Text style={tw`text-gray-800`}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


function EditScreen({ route, navigation }) {
  const { data } = route.params;
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [updateNote, { data: updateNoteData }] = useUpdateNoteMutation();

  useEffect(() => {
    if (updateNoteData) {
      navigation.navigate("Home");
    }
  }, [updateNoteData, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#1E3A8A', borderBottomWidth: 0 },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation]);

  const handleSaveNote = () => {
    updateNote({
      id: data.id,
      title,
      content,
    });
  };

  return (
    <View style={tw`flex-1 p-4 bg-blue-900`}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={tw`h-12 p-2 bg-blue-900 rounded-lg mb-4 border border-dashed border-white text-white`}
        placeholderTextColor='white'
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        style={tw`h-48 p-2 bg-blue-900 rounded-lg mb-4 border border-dashed border-white text-white`}
        multiline
        placeholderTextColor='white'
      />
      <View style={tw`flex-row justify-end`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-blue-900 p-4 rounded-lg border border-white mr-4 w-24`}
        >
          <Text style={tw`text-white text-center`}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSaveNote}
          style={tw`bg-blue-900 p-4 rounded-lg border border-white w-24`}
        >
          <Text style={tw`text-white text-center`}>Save Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


function ViewScreen({ route, navigation }) {
  const { data } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#1E3A8A', borderBottomWidth: 0 },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation]);

  return (
    <View style={tw`flex-1 p-4 bg-blue-900`}>
      <ScrollView>
        <Text style={tw`font-bold text-xl mb-4 text-white`}>{data.title}</Text>
        <Text style={tw`text-white`}>{data.content}</Text>
      </ScrollView>
      <View style={tw`flex-row justify-end mt-4`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit", { data })}
          style={tw`bg-blue-900 p-4 rounded-lg border border-white w-24`}
        >
          <Text style={tw`text-white text-center`}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Notes" }}
          />
          <Stack.Screen name="Add" component={AddScreen} options={{ title: "Add Note" }} />
          <Stack.Screen name="Edit" component={EditScreen} options={{ title: "Edit Note" }} />
          <Stack.Screen name="View" component={ViewScreen} options={{ title: "View Note" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
