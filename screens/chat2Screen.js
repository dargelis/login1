import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import { AsyncStorage,Keyboard } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat'


class  Chat2Screen extends React.Component{

    state = {
        messages: [],
        primaryCMD:"",
        requestID:"",
        answer:"",
        step:1,
        search_str:"",
        page:"0",
        sku:"",
        ordtype:"",
        ordno:"",
        prod_sector:"",
        prod_categ:"",
        prod_type:"",
        prod_brand:"",
        prod_gms:"",
        prod_size:""

      }

    componentDidMount() {

    this.setState({
        //first messages
        messages: [
        {
            _id: Math.round(Math.random() * 1000000),
            text: 'May I help you?',
            createdAt: new Date(),
            user: {
                _id: Math.round(Math.random() * 1000000),
                name: '`PaperBot`',
                avatar: 'https://www.dargelis.net/app/images/ant.jpg',
            },
            quickReplies: {
                type: 'radio', // or 'checkbox',
                values: [
                  {
                    title: 'Yes',
                    value: 'Yes',
                  },
                  {
                    title: 'No',
                    value: 'no',
                  },
                ],
            },
        },
        {
            _id: Math.round(Math.random() * 1000000),
            text: 'Hello, my name is PaperBot :)',
            createdAt: new Date(),
            user: {
            _id: Math.round(Math.random() * 1000000),
            name: 'PaperBot',
            avatar: 'https://www.dargelis.net/app/images/ant.jpg',
            },
        },
        ],
    })
    }

    getAnswer(sentence) {
        var cmd="";
        // console.log("step before",this.state.step);
        // console.log("sentence",sentence);
        Keyboard.dismiss();//hide keyboard
        fetch('https://dargelis.net/app/backendresponseV3_chatbot.php',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            QRY: 'checkFullSentence',
            SENT: sentence,
            STEP: this.state.step,
            SEARCH_STR: this.state.search_str,
            PAGE: this.state.page,
            SKU:this.state.sku,
            ORDTYPE:this.state.ordtype,
            ORDNO:this.state.ordno,
            PROD_SECTOR:this.state.prod_sector,
            PROD_CATEG:this.state.prod_categ,
            PROD_TYPE:this.state.prod_type,
            PROD_BRAND:this.state.prod_brand,
            PROD_GMS:this.state.prod_gms,
            PROD_SIZE:this.state.prod_size
          })
        })
        .then((response) => response.json())
        .then((res) => {
            //get questions or answer from BOT
            cmd = res[0]["res"];
            //get options
            var opt=[];
            if(res[0]["opt"]) opt = res[0]["opt"];
            //get step
            var st=res[0]["step"];
            this.setState({step: st});
            //get search_str
            this.setState({search_str: res[0]["search_str"]});   
            console.log('Search str:',this.state.search_str);
            //get page
            this.setState({page: res[0]["page"]});   
            console.log('Page str:',this.state.page);
            //get SKU
            this.setState({sku: res[0]["sku"]});   
            console.log('SKU str:',this.state.sku);
            //get order type
            this.setState({ordtype: res[0]["ordtype"]});   
            console.log('ORDTYPE str:',this.state.ordtype);
            //get order number
            this.setState({ordno: res[0]["ordno"]});   
            console.log('ORDNO str:',this.state.ordno);
            //get prod prod_sector
            this.setState({prod_sector: res[0]["prod_sector"]});   
            console.log('PROD SECTOR:',this.state.prod_sector);
            //get prod prod_categ
            this.setState({prod_categ: res[0]["prod_categ"]});   
            console.log('PROD CATEG:',this.state.prod_categ);
            //get prod prod_type
            this.setState({prod_type: res[0]["prod_type"]});   
            console.log('PROD TYPE:',this.state.prod_type);    
            //get prod prod_brand
            this.setState({prod_brand: res[0]["prod_brand"]});   
            console.log('PROD BRAND:',this.state.prod_brand);     
            //get prod prod_gms
            this.setState({prod_gms: res[0]["prod_gms"]});   
            console.log('PROD GMS:',this.state.prod_gms);                        
            //get prod prod_size
            this.setState({prod_size: res[0]["prod_size"]});   
            console.log('PROD SIZE:',this.state.prod_size);                        


            if ((cmd) ) {  //if questions/answer wasn't sent then it will not be displayed
                console.log("processed Sentence: ",sentence);
                console.log("processed Answer: ",cmd);
                console.log("processed options: ",opt);
                console.log("step after",st);
                
                // add my message
                let tmpmsg = [{
                    _id: Math.round(Math.random() * 1000000),
                    text: cmd,
                    createdAt: new Date(),
                    user: {
                        _id: Math.round(Math.random() * 1000000),
                        name: 'PaperBot',
                        avatar: 'https://www.dargelis.net/app/images/ant.jpg',
                    },
                    quickReplies: {
                        type: 'radio', // or 'checkbox',
                        values: opt  //options
                    },
                    }]

                this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, tmpmsg),
                }))
            }

            //On return to the begging
            if (this.state.step=="1"){
                console.log("FROM THE BEGINNG");
                // add my message
                let tmpmsg = [
                    {
                        _id: Math.round(Math.random() * 1000000),
                        text: 'May I help you again?',
                        createdAt: new Date(),
                        user: {
                            _id: Math.round(Math.random() * 1000000),
                            name: '`PaperBot`',
                            avatar: 'https://www.dargelis.net/app/images/ant.jpg',
                        },
                        quickReplies: {
                            type: 'radio', // or 'checkbox',
                            values: [
                              {
                                title: 'Yes',
                                value: 'Yes',
                              },
                              {
                                title: 'No',
                                value: 'no',
                              },
                            ],
                        },
                    }]
                setTimeout(() => {
                    this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, tmpmsg),
                    }))
                }, 3000)//delay 2sec
            }

        })
        .catch((error) =>{
          alert('connection error');
        })
        .done();
    }


    onSend(messages = []) {
        //remove punctuation
        var sentence;
        sentence = messages[0].text
                        .replace("?", "")
                        .replace("!", "")
                        .replace(",", "")
                        // .replace(":", "")
                        .replace("’", "")
                        .replace("'", "");
        
        //get full sentance
        setTimeout(() => this.getAnswer(sentence), Math.round(Math.random() * 100)+100)
        // this.getAnswer(sentence);
        //put entered message to chat
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
            }))
      }


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
                            style={styles.chatStyle}
                            onSend={messages => this.onSend(messages)}
                            onQuickReply={this.onQuickReply}
                            quickReplyStyle={{ borderRadius: 10 }}
                            // isTyping={true}
                            // renderChatFooter={this.renderFooter}
                            user={{
                            _id: 1
                            }}
                        />
                       
                </View>
            </View>
            )
        }
}

export default Chat2Screen;

const styles = StyleSheet.create({
    container: {
        height:"100%",
    },
    chatWrapper:{
        flex: 1,
        backgroundColor: "lightgray"
    },
    chatStyle:{
        
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