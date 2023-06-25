// return redirect to https://github.com/BlueBeret/Python-and-Django-Rest-Framework-Tutorial
// with server side redirect

export const getServerSideProps = async (context) => {
    return {
        redirect: {
            statusCode: 301,
            destination: 'https://github.com/BlueBeret/TaigaPointCounter'
        }
    }
}

export default function Django() {
    return (
        <div>You are being redirected if not, please click <a href="https://github.com/BlueBeret/TaigaPointCounter">here</a></div>
    )
}