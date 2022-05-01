

import { useState } from 'react'

const AdminPage = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [secret, setSecret] = useState('')

    async function handleClick(e) {
        console.log(title, body)
        const res = await fetch('/api/diary/adddiary', {
            method: 'POST',
            body: JSON.stringify({
                dtitle: title,
                dbody: body,
                secret: secret
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (res.status === 200) {
            setTitle('')
            setBody('')
        }
    }
    return (
        <div className="bg-black text-black w-min p-5">
            <form>


                <input type="text" name="title" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="password" name="secret" placeholder='secret' value={secret} onChange={e => setSecret(e.target.value)} />
                <textarea name="body" placeholder="body" className="h-[200px]" value={body} onChange={e => setBody(e.target.value)} />
            </form>
            <br></br>
            <button onClick={handleClick} className="bg-white">Submit</button>
        </div>
    );
}

export default AdminPage