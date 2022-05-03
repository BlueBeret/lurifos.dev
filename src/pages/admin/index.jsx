import { getSession } from "next-auth/react"
import { useState } from 'react'
import EditDiary from '@/components/admin/EditDiary'
const AdminPage = ({ user }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [secret, setSecret] = useState('')

    async function handleClick(e) {
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
    if (user) {
        return (
            <div className="content-container items-start">
                <div className=" text-black p-5 w-full flex flex-col">
                    <form className="flex flex-col gap-2">
                        <h1>Add Diary</h1>

                        <input type="text" className="border-2 " name="title" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                        <input type="password" name="secret" placeholder='secret' value={secret} onChange={e => setSecret(e.target.value)} />
                        <textarea name="body" placeholder="body" className="border-2 h-[200px]" value={body} onChange={e => setBody(e.target.value)} />
                    </form>
                    <button onClick={handleClick} className="ml-auto bg-black text-white px-2 py-1 rounded-lg mt-2">Submit</button>
                </div>

                <EditDiary />
            </div>


        );
    }
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/' })
        context.res.end()
        return {
            props: {}
        }
    } else if (session.user.email !== process.env.ADMIN_EMAIL) {
        context.res.writeHead(302, { Location: '/' })
        context.res.end()
        return {
            props: {}
        }
    } else {
        return {
            props: {
                user: session.user
            }
        }
    }
}

export default AdminPage;