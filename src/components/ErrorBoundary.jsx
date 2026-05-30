import { Component } from 'react'
import Icon from './Icon.jsx'

// 捕获渲染期异常，避免整屏白屏；提供"返回首页 / 重试"出口。
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // 生产可上报；原型仅打印
    console.error('页面渲染异常：', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    // 回到首页，绕开出错路由
    window.location.hash = '#/home'
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div role="alert" className="min-h-screen w-full flex items-center justify-center bg-surface px-8 font-body">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
            <Icon name="help" size={32} className="text-error" />
          </div>
          <h1 className="font-headline text-[22px] text-on-surface mb-2">页面出了点小状况</h1>
          <p className="font-label text-[13px] text-outline mb-6 leading-relaxed">
            抱歉，刚才的操作遇到了意外错误。你可以返回首页继续使用，数据不会丢失。
          </p>
          <button onClick={this.handleReset}
            className="h-12 px-8 bg-primary text-white font-label rounded-lg active:scale-95 transition">
            返回首页
          </button>
        </div>
      </div>
    )
  }
}
