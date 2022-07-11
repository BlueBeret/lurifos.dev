import { getSession } from "next-auth/react"
import { useState, useEffect, useRef } from "react"
import toast, { Toaster } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import Image from "next/image"
const Ask = ({ user }) => {
    const usernamedefault = user.name.split(' ')[0].toLowerCase() || ""
    const [username, setUsername] = useState(usernamedefault)
    const [question, setQuestion] = useState('')
    const [isAnon, setisAnon] = useState(false)
    const [label, setLabel] = useState('Click to hide your name')
    const usernameinput = useRef(null)

    useEffect(() => {
        if (isAnon) {
            setUsername('secretagent')
            setLabel('Click to show your name')
        } else {
            setUsername(usernamedefault)
            setLabel('Click to hide your name')
        }

    }, [isAnon, usernamedefault])

    useEffect(() => {
        toast(
            <div>

                <div className="text-sm">Click at your name to make it an anonymous question</div>
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



    if (false) {

        return <div className="content-container">
            <div>
                <Image src='/images/not authorized.png' alt="not authorized ilustration" width={500} height="500" objectFit="cover"></Image>
            </div>
            <div>
                To prevent spam, you must be logged in to ask a question.
            </div>
            <div>
                Please <span onClick={() => signIn()} className="font-bold hover:cursor-pointer hover:border-b-2 hover:border-syellow text-syellow">Sign In</span> to ask a question.
            </div>

        </div>
    }
    else {
        return (
            <div className="content-container fillheight">

                <div className="question-input mt-10 relative w-full max-w-[1080px] px-2">
                    <div className="username-input flex flex-row absolute -top-4 left-4">
                        <input ref={usernameinput} type={"text"} value={username}
                            className="rounded-lg  bg-white px-4 py-1 hover:cursor-pointer" onClick={(e => setisAnon(!isAnon))} title={label}></input>
                    </div>
                    <textarea className="rounded-lg shadow-md -z-10 py-6 px-4 w-full" placeholder="Write your question here and I'll answer it as soon as possible. Inappropriate question will be deleted."
                        value={question} onChange={(e) => setQuestion(e.target.value)}>
                    </textarea>
                    <button onClick={submit} className="float-right bg-syellow text-white font-bold py-1 px-2 rounded-lg">submit</button>
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
                user: {
                    name: "invalid",
                    email: 'not logged in'
                }
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