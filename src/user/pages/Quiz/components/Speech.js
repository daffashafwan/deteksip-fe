
import React, { Component } from "react"

//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'


//------------------------COMPONENT-----------------------------

class Speech extends Component {

    constructor() {
        super()
        this.state = {
            listening: false
        }
        this.toggleListen = this.toggleListen.bind(this)
        this.handleListen = this.handleListen.bind(this)
    }

    toggleListen() {
        this.setState({
            listening: !this.state.listening
        }, this.handleListen)
    }

    handleListen() {
        console.log(this.props.name);
        console.log('listening?', this.state.listening)

        if (this.state.listening) {
            recognition.start()
            recognition.onend = () => {
                console.log("...continue listening...")
                recognition.start()
            }

        } else {
            recognition.stop()
            recognition.onend = () => {
                console.log("Stopped listening per click");
                if (!(document.getElementById('final').innerHTML.replace(" ", ""))) {
                    alert('Suara Tidak Jelas');
                    this.props.parentCallback(null);
                }
                if (document.getElementById('final').innerHTML.replace(" ", "") === this.props.name) {
                    alert('jawaban benar');
                    this.props.parentCallback("benar");
                } else {
                    alert('Jawaban salah');
                    this.props.parentCallback("salah");
                }
            }
        }

        recognition.onstart = () => {
            console.log("Listening!")
        }

        let finalTranscript = ''
        recognition.onresult = event => {
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                else interimTranscript += transcript;
            }
            document.getElementById('interim').innerHTML = interimTranscript
            document.getElementById('final').innerHTML = finalTranscript

            //-------------------------COMMANDS------------------------------------

            const transcriptArr = finalTranscript.split(' ')
            const stopCmd = transcriptArr.slice(-3, -1)
            console.log('stopCmd', stopCmd)

            if (stopCmd[0] === 'stop' && stopCmd[1] === this.props.name) {
                recognition.stop()
                recognition.onend = () => {
                    console.log('Stopped listening per command')
                    const finalText = transcriptArr.slice(0, -3).join(' ')
                    document.getElementById('final').innerHTML = finalText
                }
            }
        }

        //-----------------------------------------------------------------------

        recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error)
        }

    }

    render() {
        return (
            <div style={container}>
                <button id='microphone-btn' style={this.state.listening ? button : button_onclick} onClick={this.toggleListen} />
                <div id='interim' style={interim}></div>
                <div id='final' style={final}></div>
            </div>
        )
    }
}

export default Speech


//-------------------------CSS------------------------------------

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    button: {
        width: '60px',
        height: '60px',
        background: 'green',
        borderRadius: '50%',
        margin: '6em 0 2em 0'
    },
    button_onclick: {
        width: '60px',
        height: '60px',
        background: 'red',
        borderRadius: '50%',
        margin: '6em 0 2em 0'
    },
    interim: {
        color: 'gray',
        border: '#ccc 1px solid',
        padding: '1em',
        margin: '1em',
        width: '300px'
    },
    final: {
        color: 'black',
        border: '#ccc 1px solid',
        padding: '1em',
        margin: '1em',
        width: '300px'
    }
}

const { container, button, interim, final, button_onclick } = styles