import React, { useCallback, useState } from 'react'
import styles from './App.module.less'
import { Button, message, Slider } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import UploadList from '@/pages/UploadList'
import { open } from 'tauri/api/dialog'

export type IList = {
  url: string
  converted: boolean
}[]


export interface IApp {
  list: IList,
  globalConvert: boolean
}


// function readImage(url) {
//   return new Promise<string>((resolve, reject) => {
//     if (!url) {
//       return resolve('无 url')
//     }
//     // BinaryFile 转 base64
//     readBinaryFile(url).then(img => {
//       const base64 = Buffer.from(img).toString('base64')
//       resolve(base64)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }
//

function App() {
  const [{ list, globalConvert }, setValue]: [IApp, React.Dispatch<React.SetStateAction<IApp>>] = useState({
    list: [],
    globalConvert: false
  } as IApp)


  const [quality, setQuality] = useState(75)

  const openFiles = useCallback(async () => {
    try {
      // 只能打开多个文件或者一个文件夹 质量
      // jpg 待解决 已转换
      if (globalConvert) {
        message.info('正在转换中')
        // return
      }
      const result = await open({
        filter: 'png',
        multiple: true,
      }) as string[]

      setValue({
        list: result.map((url, index) => {
          return {
            url,
            converted: false,
          }
        }),
        globalConvert: true
      })

      console.log('文件 result', result) // 直接获取了路径
    } catch (e) {
      console.log(e)
      // message.info('用户取消了选择',1000)
    }
  }, [globalConvert])

  return (
    <div className={styles.App}>
      <h4>图片质量(默认 75):</h4>
      <Slider onAfterChange={setQuality} defaultValue={75}/>
      <Button className={styles.uploadBtn} onClick={openFiles} icon={<UploadOutlined/>}>选择图片文件</Button>
      <div className={styles.tip}>图片转换完毕后会自动保存在原图位置处</div>
      <UploadList quality={quality} list={list} setValue={setValue}/>
    </div>
  )
}

export default App
