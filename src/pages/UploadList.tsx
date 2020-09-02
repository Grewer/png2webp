import React, { useEffect, useState } from 'react'
import { Avatar, List } from 'antd'
import { IList } from '@/App'

const Item = List.Item, Meta = Item.Meta

interface IProps {
  list: IList
  setValue: (value: any) => void
}

function renderItem(item) {
  return <Item actions={[item.loading && <span>loading</span>]}>
    <Meta
      avatar={
        <Avatar shape={'square'} src={`data:image/png;base64,${item.base64}`}/>
      }
      title={
        <div style={{ width: '100%', wordWrap: 'break-word' }}>
          {item.url}
        </div>
      }
    />
  </Item>
}

function UploadList(props: IProps) {
  const { list } = props
  const [data, setData]: [IList, React.Dispatch<React.SetStateAction<IList>>] = useState([] as IList)

  useEffect(() => {
    if (list.length) {
      setData(list)
      console.log('开始转换')
    }
  }, [list])

  return <List
      size="small"
      bordered
      itemLayout="horizontal"
      dataSource={data}
      renderItem={renderItem}
      locale={{ emptyText: '请选择图片' }}
    />
}


export default UploadList
