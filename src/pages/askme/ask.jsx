import { getSession } from "next-auth/react"
import { useState, useEffect, useRef } from "react"
import toast, { Toaster } from 'react-hot-toast'
const Ask = ({ user }) => {
    const usernamedefault = user.name.split(' ')[0].toLowerCase()
    const [username, setUsername] = useState(usernamedefault)
    const [question, setQuestion] = useState('')
    const [isAnon, setisAnon] = useState(false)
    const usernameinput = useRef(null)

    useEffect(() => {
        if (isAnon) {
            setUsername('secretagent')
        } else setUsername(usernamedefault)

    }, [isAnon, usernamedefault])

    useEffect(() => {
        toast(
            <div>

                <div className="text-sm">Click at your name to make anonymous question</div>
            </div>

            , {
                icon: <div className="font-bold">ProTip!</div>,
                position: "bottom-center",
                duration: 15000
            })
    }, [])

    const submit = () => {
        toast.promise(new Promise(async (resolve, reject) => {
            const res = await fetch('/api/askme/add', {
                method: 'POST',
                body: JSON.stringify({
                    'question': question,
                    'isAnon': isAnon
                }),
                headers: {
                    'Content-Type': 'application/json',
                }


            })
            if (res.status == 200) {
                resolve('Your question is posted.')
            } else if (res.status == 403) {
                reject('You are not authorized to post a question')
            } else {
                reject('Something went wrong')
            }

        }), {
            loading: "Posting your question",
            success: data => data,
            error: data => data
        })
    }



    if (!user) {

        return <div className="">
            To prevent spam, you must be logged in to ask a question.
        </div>
    }
    else {
        return (
            <div className="content-container fillheight">

                <div className="question-input mt-10 relative w-full max-w-[1080px] px-2">
                    <div className="username-input flex flex-row absolute -top-4 left-4">
                        <p ref={usernameinput} type={"text"} value={username}
                            className="rounded-lg  bg-white px-4 py-1 hover:cursor-pointer" onClick={(e => setisAnon(!isAnon))}>{username}</p>
                    </div>
                    <textarea className="rounded-lg shadow-md -z-10 py-6 px-4 w-full" placeholder="Write your question here and I'll answer it as soon as possible. Inappropriate question will be deleted."
                        value={question} onChange={(e) => setQuestion(e.target.value)}>
                    </textarea>
                    <button onClick={submit}>submit</button>
                </div>
                <Toaster />
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        return {
            props: {
                user: null
            }
        }
    }
    else {
        return {
            props: {
                user: session.user
            }
        }
    }
}

export default Ask