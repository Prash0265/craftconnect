
import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image,FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ArtDetails = ({ route }) => {
  const { item, description } = route.params;
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [highestBidder, setHighestBidder] = useState('');
  const [highestBidAmount, setHighestBidAmount] = useState(0);
  const submitBid = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username'); // Replace with actual username or fetch dynamically
      if (!storedUsername) {
        console.error('Username not found');
        return;
      }// Replace with actual username or fetch dynamically

      // Make a request to your server to add the bid
      await axios.post('http:/10.0.0.221:3000/add-bid', {
        productId: item.id,
        username:storedUsername,
        price:bidAmount,
      });
      setBidAmount('');
      // Handle success or navigate to a different screen
      console.log('Bid submitted successfully');
      // Refresh bids after a new bid is placed
      fetchBids();
    } catch (error) {
      console.error('Error submitting bid:', error);
      // Handle error, display an error message, etc.
    }
  };;
  const fetchBids = async () => {
    try {
      const response = await axios.get(`http:/10.0.0.221:3000/bids/${item.id}`);
      console.log('Fetch Bids Response:', response.data);
      setBids(response.data);
      let maxBid = 0;
      let winningBidder = '';
      response.data.forEach((bid) => {
        if (bid.price > maxBid) {
          maxBid = bid.price;
          winningBidder = bid.username;
        }
      });

      setHighestBidAmount(maxBid);
      setHighestBidder(winningBidder);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };
  const submitReview = async () => {
    try {
      // Assuming you have the user's username stored in the state or context
      const storedUsername = await AsyncStorage.getItem('username'); // Replace with actual username or fetch dynamically
      if (!storedUsername) {
        console.error('Username not found');
        return;
      }
      // Make a request to your server to add the review
      await axios.post('http:/10.0.0.221:3000/add-review', {
        username:storedUsername,
        productId: item.id,
        rating: parseInt(rating), // Assuming rating is a number
        comment,
      });
      setRating('');
      setComment('');
      fetchReviews();
      
      // Handle success or navigate to a different screen
      console.log('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error, display an error message, etc.
    }
  };
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http:/10.0.0.221:3000/reviews/${item.id}`);
      console.log('Fetch Reviews Response:', response.data);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    // Fetch reviews when the component mounts
    fetchBids();
    fetchReviews();
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    fetchUsername();
  }, []);
  const renderBidItem = ({ item: bid }) => (
    <View style={styles.bidItem}>
      <Text>{`User: ${bid.username}`}</Text>
      <Text>{`Bid: $${bid.price.toFixed(2)}`}</Text>
    </View>
  );

  const renderReviewItem = ({ item: review }) => (
    <View style={styles.reviewItem}>
      <Text>{`Rating: ${review.rating}`}</Text>
      <Text>{`Comment: ${review.comment}`}</Text>
      <Text>{`By: ${review.createdBy}`}</Text>
    </View>
  );
  return (
    <ScrollView> 
      <View style={styles.container}>
      <Image source={item.image} style={styles.artImage} />
      <Text style={styles.title}>{item.id}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
      <Text>{item.id}</Text>
      <View style={styles.bidSection}>
        <Text style={styles.bidHeading}>Bidding</Text>
        <Text>{`Highest Bid: $${highestBidAmount.toFixed(2)} by ${highestBidder}`}</Text>
        <FlatList
          data={bids}
          keyExtractor={(bid) => bid._id}
          renderItem={renderBidItem}
        />
        {/* Input for user to submit a new bid */}
        <TextInput
          style={styles.input}
          placeholder="Enter your bid"
          keyboardType="numeric"
          value={bidAmount}
          onChangeText={(text) => setBidAmount(text)}
        />
        <Button title="Place Bid" onPress={submitBid} />
      </View>
      {/* Display other product details here */}
      {/* Product Reviews Section */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewHeading}>Product Reviews</Text>
        {/* {console.log('Fetched Reviews:', reviews)} */}
        <FlatList style={styles.reviewlist}
          data={reviews}
          keyExtractor={(review) => review._id}
          renderItem={renderReviewItem}
        />

        <TextInput
          style={styles.input}
          placeholder="Rating (1-5)"
          keyboardType="numeric"
          value={rating}
          onChangeText={(text) => setRating(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Your review"
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />

        <Button title="Submit Review" onPress={submitReview} />
      </View>
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    artImage: {
      width: '100%',
      height: 300, // Adjust the height as needed
      borderRadius: 8,
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      marginBottom: 16,
    },
    price: {
      fontSize: 18,
      marginBottom: 16,
    },
    bidSection: {
      marginTop: 16,
      borderWidth: 2,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 16,
    },
    bidHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    bidItem: {
      marginBottom: 16,
      backgroundColor:'#8E9494',
      borderColor:'#000000',
      borderWidth:2,
    },
    reviewlist:{

    
    },
    reviewSection: {
      marginTop: 16,
      borderWidth: 2,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 16,
    },
    reviewHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    reviewItem: {
      marginBottom: 16,
      backgroundColor:'#8E9494',
      borderColor:'#000000',
      borderWidth:2,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 8,
    },
  });

export default ArtDetails;

