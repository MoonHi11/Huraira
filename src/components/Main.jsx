
import React from "react"
import ReactMarkdown from "react-markdown"
import { getMessageFromAi, getQuestionFromAi } from "../AImodel"
import Header from "./Header"
import { imageToText } from "../../tesseract"
function Main() {
    const [IsGenerating, setIsGenerating] = React.useState(false)

    const [responce, setResponce] = React.useState('')
    const [question, setQuestion] = React.useState('')
    const [getmessage, setGetMessage] = React.useState(null)

    async function imageToTextReply(imagefile) {
        const textFrommImage = await imageToText(imagefile)
        console.log(textFrommImage)
        reply(textFrommImage)
    }


    async function reply(message) {
        setIsGenerating(prev => !prev)
        setResponce(await getMessageFromAi(message))
        setIsGenerating(prev => !prev)
    }

    function handleSubmit(formData) {
        const newMessage = formData.get('message')
        setQuestion(newMessage)
        const newImage = formData.get('image')

        newImage.name === '' ? newMessage === '' ? alert('message can\'t be empty') : reply(newMessage) : imageToTextReply(newImage)

    }




    return (
        <>
            <main>
                <section>
                    <Header />
                </section>

                <section className="display">
                    {question === '' ? null : <div className="Question">{question}</div>}
                    {responce === '' && question === '' ? <div className="empty-display"><h1>Ask Huraira</h1>
                        <p>Your deen assitance </p></div> : <div className="responce">{IsGenerating ? <i className="material-icons"><span className="loading">refresh</span></i> : <ReactMarkdown>{responce}</ReactMarkdown>}</div>}
                </section>


                <form action={handleSubmit} className="message-form">
                    <input id="images" type="file" className="image" name="image" hidden />
                    <label htmlFor="images" className="btn"><i className="material-icons">photo</i></label>
                    <input type="text" placeholder="Ask Huraira" name="message" />
                    <button>{IsGenerating ? <i className="material-icons">pause</i> : <i className="material-icons">arrow_upward</i>}</button>
                </form>
            </main>
        </>
    )
}
export default Main