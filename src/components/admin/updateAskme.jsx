import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import toast, { Toaster } from 'react-hot-toast'

export default function EditDiary() {
    const [uuid, setUuid] = useState('')
    const [question, setQuestion] = useState('')
    const [asnwer, setAnswer] = useState('')
    const [username, setUsername] = useState('')
    const [secret, setSecret] = useState('')

    const searchDiary = () => {
        fetch(`/api/askme/askme?uuid=${uuid}`)
            .then(res => res.json())
            .then(data => {
                setQuestion(data.question)
                setAnswer(data.answer)
                setUsername(data.username)
            })
    }

    async function updateDiary(e) {
        const res = await fetch('/api/askme/update', {
            method: 'POST',
            body: JSON.stringify({
                duuid: uuid,
                dquestion: question,
                danswer: asnwer,
                dusername: username,
                secret: secret
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (res.status === 200) {
            toast.success('수정 완료!')
        }
    }
    return <div className="p-5 w-full flex flex-col items-start">
        <h1>Edit Askme</h1>

        <form className="flex flex-col gap-2 w-full justify-center">
            <div className="flex flex-row items-center w-full">
                <input type="text" value={uuid} name="uuid" className="border-2 w-full" placeholder="uuid" onChange={(e) => setUuid(e.target.value)}></input>
                <span className="bg-black w-8 h-full text-white font-bold flex flex-row items-center justify-center hover:cursor-pointer"
                    onClick={searchDiary}><FaSearch /></span>
            </div>

            <input type="text" className="border-2 " name="title" placeholder="title" value={question} onChange={e => setQuestion(e.target.value)} />
            <input type="password" name="secret" className="border-2" placeholder='secret' value={secret} onChange={e => setSecret(e.target.value)} />
            <textarea name="body" placeholder="body" className="border-2 h-[200px]" value={asnwer} onChange={e => setAnswer(e.target.value)} />
        </form>

        <button className="ml-auto bg-black text-white px-2 py-1 rounded-lg mt-2" onClick={updateDiary}>update</button>
        <Toaster></Toaster>
    </div>
}