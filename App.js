import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, FlatList, Button, ActivityIndicator, SafeAreaView } from 'react-native';

const API_URL = 'https://newsapi.org/v2/everything?q=tesla&from=2024-06-18&sortBy=publishedAt&apiKey=5988a18f8534462ba5be6d9fff83fe9a';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchText, setSearchText] = useState(''); // Initial empty string, it was presenting issues if not initialized.
  const [isLoading, setIsLoading] = useState(false); 

  const fetchData = async () => {
    setIsLoading(true); 
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setArticles(data.articles);
      setFilteredArticles(data.articles); // Initial set of all articles
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText) { // Perform search only if searchText has a value
      const filteredData = articles.filter((article) =>
        article.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredArticles(filteredData);
    } else {
      setFilteredArticles(articles); // Reset to all articles if search is empty
    }
  }, [searchText]); // This effect runs whenever searchText changes

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, 
          borderWidth: 1, 
          padding: 5, 
          top: 50, 
          marginBottom: 50, 
          color: 'black', 
          backgroundColor: 'white', 
          textAlign: 'center' }}
        placeholder="Search Articles"
        onChangeText={setSearchText}
        value={searchText}
      />
      <Button title="Clear" onPress={() => setSearchText('')} />  
      {isLoading ? (  // for loading indicator (optional)
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : null}
      <FlatList
        data={filteredArticles}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
    </View>
    </SafeAreaView>
  );
};

export default App;
