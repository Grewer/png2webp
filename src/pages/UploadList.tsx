import React from 'react'
import { List, Spin } from 'antd'
import { IList } from '@/App'
import { execute } from 'tauri/api/process'
import getInfoByPath from '@/utils/getInfoByPath'
import { CheckOutlined } from '@ant-design/icons'
import { invoke } from 'tauri/api/tauri'

const Item = List.Item, Meta = Item.Meta

interface IProps {
  list: IList
  quality: number
  setValue: (value: any) => void
}

interface IState {
  list: IList
}

function renderItem(item: IList[number]) {
  return <Item actions={[item.converted ? <CheckOutlined/> : <Spin/>]}>
    <Meta
      title={
        <div style={{ width: '100%', wordWrap: 'break-word' }}>
          {item.url}
        </div>
      }
    />
  </Item>
}


class UploadList extends React.Component<IProps, IState> {
  state = {
    list: []
  }

  static getDerivedStateFromProps = (nextProps: IProps, prevState) => {
    if (nextProps.list) {
      return {
        list: nextProps.list
      }
    }
    return prevState
  }

  convert = async (item: IList[number]) => {
    try {
      const path = item.url
      const { name, suffix, directory } = getInfoByPath(path)
      if (suffix !== 'png') {
        return Promise.resolve()
      }
      // 可以正常运行 打包后出问题 todo  需要使用 rust 来启动?
      const result = await execute('cwebp', ['-q', this.props.quality.toString(), path, '-o', `${directory}${name}.webp`, '-mt'])

      item.converted = true

      this.setState({
        list: [...this.state.list]
      })
      console.log('结果1', result)
      if (result) {
        alert(result)
      }
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }


  componentDidUpdate(prevProps: Readonly<IProps>, prevState: IState) {
    if (this.state.list && (prevProps.list !== this.props.list)) {
      this.start()
    }
  }

  start = async () => {
    console.log('开始运行')
    await Promise.all(this.state.list.map(this.convert))
    this.props.setValue(prev => {
      return {
        ...prev,
        globalConvert: false
      }
    })
  }

  render() {
    console.log(this.state, this.props)
    const { list } = this.state
    return <List<IList[number]>
      size="small"
      bordered
      itemLayout="horizontal"
      dataSource={list}
      renderItem={renderItem}
      locale={{ emptyText: '请选择图片' }}
    />
  }
}


export default UploadList
