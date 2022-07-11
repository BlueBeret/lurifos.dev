import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import toast from 'react-hot-toast'
export default function EditDiary() {
    const [uuid, setUuid] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [secret, setSecret] = useState('')

    const searchDiary = () => {
        fetch(`/api/diary/diary?uuid=${uuid}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setBody(data.body)
                toast.success('Done fetching diary!')
            })
    }

    async function updateDiary(e) {
        const updateDiary = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/diary/updatediary', {
                method: 'POST',
                body: JSON.stringify({
                    duuid: uuid,
                    dtitle: title,
                    dbody: body,
                    secret: secret
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                resolve("Done, diary updated")
                setTitle('')
                setBody('')
            } else {
                reject("Error, diary not updated")
            }
        })

        toast.promise(updateDiary, {
            loading: "uploading",
            success: data => data,
            error: data => data
        })

    }
    return <div className="p-5 w-full flex flex-col items-start">
        <h1>Edit Diary</h1>

        <form className="flex flex-col gap-2 w-full justify-center">
            <div className="flex flex-row items-center w-full">
                <input type="text" value={uuid} name="uuid" className="border-2 w-full" placeholder="uuid" onChange={(e) => setUuid(e.target.value)}></input>
                <span className="bg-black w-8 h-full text-white font-bold flex flex-row items-center justify-center hover:cursor-pointer"
                    onClick={searchDiary}><FaSearch /></span>
            </div>

            <input type="text" className="border-2 " name="title" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="password" name="secret" className="border-2" placeholder='secret' value={secret} onChange={e => setSecret(e.target.value)} />
            <textarea name="body" placeholder="body" className="border-2 h-[200px]" value={body} onChange={e => setBody(e.target.value)} />
        </form>

        <button className="ml-auto bg-black text-white px-2 py-1 rounded-lg mt-2" onClick={updateDiary}>update</button>
    </div>
}