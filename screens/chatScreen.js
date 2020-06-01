import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat'

class  ChatScreen extends React.Component{

    state = {
        messages: [],
        primaryCMD:"",
        requestID:""
        // tmpmsg:[]
      }

    componentDidMount() {
    this.setState({
        messages: [
        {
            _id: Math.round(Math.random() * 1000000),
            text: 'How may I help you?',
            createdAt: new Date(),
            user: {
            _id: Math.round(Math.random() * 1000000),
            name: '`PaperMan`',
            avatar: 'https://www.dargelis.net/app/images/ant.jpg',
            },
            quickReplies: {
                type: 'radio', // or 'checkbox',
                values: [
                  {
                    title: 'Yes',
                    value: 'yes',
                  },
                  {
                    title: 'Nope. What?',
                    value: 'no',
                  },
                ],
            },
        },
        {
            _id: Math.round(Math.random() * 1000000),
            text: 'Hello, my name is PaperMan :)',
            createdAt: new Date(),
            user: {
            _id: Math.round(Math.random() * 1000000),
            name: '`PaperMan`',
            avatar: 'https://www.dargelis.net/app/images/ant.jpg',
            },
        },
        ],
    })
    }

    checkFullSentence(sent, req_id) {
        var cmd="";
        console.log("sentence",sent);

        fetch('https://dargelis.net/app/backendresponseV2.php',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            QRY: 'checkFullSentence',
            SENT: sent
          })
        })
        .then((response) => response.json())
        .then((res) => {
            cmd = res[0]["res"];
            console.log(cmd);
            if ((cmd) && (this.state.requestID!==req_id)) {  //checking that only first Sentence will be processed
                console.log("processed Sentence: ",sent);
                this.setState({requestID: req_id});
                this.setState({primaryCMD: cmd});
                this.prepareAnswer();
                this.setState({primaryCMD: ""});
            }
        })
        .catch((error) =>{
          alert('connection error');
        })
        .done();
    }

    getPrimaryCmd(word, req_id,last) {
        var cmd="";
        console.log("word: ",word);
        console.log("it is last: ",last);

        fetch('https://dargelis.net/app/backendresponseV2.php',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            QRY: 'getPrimaryCmd',
            WORD: word
          })
        })
        .then((response) => response.json())
        .then((res) => {
            cmd = res[0]["res"];
            if ((cmd) && (this.state.requestID!==req_id)) {  //checking that only first word will be processed
                console.log("processed word: ",word);
                this.setState({requestID: req_id});
                this.setState({primaryCMD: cmd});
                this.prepareAnswer();
                this.setState({primaryCMD: ""});
            }
            //if nothing is possible to understand
            if ((this.state.requestID!==req_id) && (last==1) ){
                this.setState({primaryCMD: "other"});
                this.prepareAnswer();
                this.setState({primaryCMD: ""});
            }
        })
        .catch((error) =>{
          alert('connection error');
        })
        .done();
    }

    prepareAnswer(){
        console.log("requirest result3: ",this.state.primaryCMD);
        //text preparation
        var res_text="";
        if (this.state.primaryCMD ==="help") {
            res_text = "I'm happy to help you, could you explain how?";
          } 
        else if (this.state.primaryCMD ==="search") {
            res_text = "Let's find the product special for you. From which area do you need product: print, packaging, office or viscom?";
        } 
        else if (this.state.primaryCMD ==="balance") {
            res_text = "On local warehouse we have 480 reams of that product, but after two working days we can get additional 2400reams";
        } 
        else if (this.state.primaryCMD ==="price") {
            res_text = "Your price is 350.34EUR, per 1000 sheets. If you buy more then 1 pallet I can offer better price 320.99EUR";
        } 
        else if (this.state.primaryCMD ==="bargain") {
            res_text = "Would be better if my colleg Nora will call you, ok?";
          } 
        else if (this.state.primaryCMD ==="back") {
        res_text = "Nice weather, isn't it? How may I help you?";
        } 
        else if (this.state.primaryCMD ==="ok") {
            res_text = "cool :)";
            } 
        else if (this.state.primaryCMD ==="howru") {
            res_text = "Life is good :) Nice weather, isn't it?";
            } 
        else if (this.state.primaryCMD ==="other") {
            res_text = "Sorry, I can't understand you";
          }

       // add my message
       let tmpmsg = [{
        _id: Math.round(Math.random() * 1000000),
        text: res_text,
        createdAt: new Date(),
        user: {
            _id: Math.round(Math.random() * 1000000),
            name: '`Antti`',
            avatar: 'https://www.dargelis.net/app/images/ant.jpg',
                }
            }]

        this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, tmpmsg),
        }))
    }

    onSend(messages = []) {
        //remove punctuation
        var sentence="";
        sentence = messages[0].text
                        .replace("?", "")
                        .replace(",", "")
                        .replace(":", "")
                        .replace("’", "")
                        .replace("'", "")
                        .replace(")", "");
        
        //check full sentance
        this.checkFullSentence(sentence, messages[0]._id);

        //check each word
        var tmp_words = [];
        var i="";
        tmp_words = sentence.split(" ");
        for (i in tmp_words) {
            this.getPrimaryCmd(tmp_words[i], messages[0]._id,(i==tmp_words.length-1 ? '1':'0'));
        }

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
            }))

      }

    // renderQuickReplySend = () => <Text>{' custom send =>'}</Text>

    onQuickReply = replies => {
    const createdAt = new Date()
    if (replies.length === 1) {
        this.onSend([
        {
            createdAt,
            _id: Math.round(Math.random() * 1000000),
            text: replies[0].title,
            user: {
                _id: 1,
                },
        },
        ])
    } else if (replies.length > 1) {
        this.onSend([
        {
            createdAt,
            _id: Math.round(Math.random() * 1000000),
            text: replies.map(reply => reply.title).join(', '),
            user: {
                _id:1,
                },
        },
        ])
    } else {
        console.warn('replies param is not set correctly')
    }
    }

    doLogout() {
        AsyncStorage.removeItem("token")
            .then(
                this.props.navigation.navigate('Login')
            )
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.chatWrapper}>
                
                        <GiftedChat 
                            messages={this.state.messages}
                            
                            onSend={messages => this.onSend(messages)}
                            onQuickReply={this.onQuickReply}
                            quickReplyStyle={{ borderRadius: 10 }}
                            user={{
                            _id: 1,
                            }}
                        />
                       
                </View>
            </View>
            )
        }
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        height:"100%",
    },
    chatWrapper:{
        flex: 1 
    },
    userText:{
        fontSize: 30,
        fontWeight:"bold",
        marginBottom:10
    },
    logoutBtn:{
        backgroundColor:"red",
        paddingVertical:10,
        width:100,
        alignSelf:"center"

    },
    logoutBtnText:{
        color:"#fff",
        textAlign:"center",
        fontWeight:"bold"
    },
        
});