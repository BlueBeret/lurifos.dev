
import { PrismaClient } from '@prisma/client'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import styles from './markdown.module.css'


const Diary = (props) => {
  const diary = props.data.length > 0 ? props.data[0] : {
    title: 'Oh no!',
    body: `No diary found! Are you lost?  
    Let's get back to [diary](/diary)  
    If you think this is an error, please let [me](/contact) know.`,
    timecreated: 'December 16, 1991',
    lastedited: 'December 16, 1991',
  }

  const parseDate = (date) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateObj = new Date(date)
    return `${month[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear()}`
  }

  return <div className='content-container items-start max-w-[1080px]'>
    <div className='post-header flex flex-col items-start mb-5'>
      <h1>{diary.title}</h1>
      <div className='flex flex-col text-grey'>
        <span>{parseDate(diary.timecreated)}</span>
      </div>
    </div>


    <div className={styles.body}>
      <ReactMarkdown remarkPlugins={[gfm]}
      >{diary.body}</ReactMarkdown>
    </div>
    <span className='text-grey mt-1'>LastEdit: {parseDate(diary.lastedited)}</span>
  </div>
}

export async function getServerSideProps(context) {
  const { uuid } = context.query
  try {
    const prisma = new PrismaClient()
    const data = await prisma.$queryRaw`SELECT * FROM diary WHERE uuid = ${uuid}`
    prisma.$disconnect()

    data.map(x => {
      x.timecreated = x.timecreated.toString()
      x.lastedited = x.lastedited.toString()
      return x
    })
    return { props: { data } }
  } catch (error) {
    console.log(error)
    return { props: { data: [] } }
  }


}

export default Diary