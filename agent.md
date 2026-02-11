# AI Side Panel - 技术架构与实现规范 (Technical Design Document)

**版本：** v1.0 (MVP)

**架构模式：** Chrome Extension Manifest V3

**核心目标：** 零配置、零登录成本、毫秒级唤起。

---

### 1. 系统架构图 (System Architecture)

系统由三个轻量级组件构成，通过 Chrome Runtime 消息机制和 Storage API 交互。

- **Background Service Worker:** 核心大脑。负责生命周期管理、网络请求拦截规则（DNR）的注册与更新。
    
- **Side Panel (View):** 用户界面。一个极简的 HTML 容器，通过 `iframe` 承载目标 AI 网页。
    
- **DNR Rulesets (Declarative Net Request):** 网络层的“手术刀”。负责修改 Header，实现移动端伪装和 Iframe 破壳。
    

---

### 2. 核心模块详细设计

#### 2.1 网络拦截与 Header 修改 (核心技术难点)

我们不使用老旧的 `webRequestBlocking`（V3 已废弃/限制），而是使用高性能的 **Declarative Net Request (DNR)** API。

**策略逻辑：**

针对目标 AI 域名（如 `*.openai.com`, `*.claude.ai`, `*.google.com` 等），执行以下原子操作：

1. **Request 阶段 - 身份伪装：**
    
    - **Action:** `modifyHeaders`
        
    - **Header:** `User-Agent`
        
    - **Value:** `Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1`
        
    - **目的：** 强制服务器返回 Mobile Web 版页面（通常是响应式布局），适配侧边栏窄屏。
        
2. **Response 阶段 - 破壳（解除嵌入限制）：**
    
    - **Action:** `removeHeaders`
        
    - **Headers:**
        
        - `X-Frame-Options`
            
        - `Content-Security-Policy` (重点移除 `frame-ancestors` 指令)
            
    - **目的：** 允许第三方 AI 网页在我们的 `iframe` 中加载，避免 "Refused to display... in a frame" 错误。
        

#### 2.2 侧边栏容器 (Side Panel)

- **HTML 结构：**
    
    - `<nav>`: 宽度 48px，固定在左侧。包含 AI 图标列表（纯 CSS Flex 布局）。
        
    - `<iframe id="webview">`: 占据剩余宽度 (calc 100% - 48px)，高度 100vh。
        
- **状态保持：**
    
    - 利用 `chrome.storage.local` 记录 `lastActiveUrl`。
        
    - **初始化：** 插件启动时，读取 `lastActiveUrl` 并赋值给 iframe `src`。
        
    - **切换：** 点击图标 -> 更新 iframe `src` -> 更新 storage。
        

#### 2.3 数据与配置 (Data Schema)

数据结构极简，直接硬编码默认列表，支持用户扩展存储。

JSON

```
// Storage Schema
{
  "ai_tools": [
    {
      "id": "chatgpt",
      "name": "ChatGPT",
      "url": "https://chatgpt.com",
      "icon": "assets/icons/chatgpt.png", // 或 base64
      "is_default": true
    },
    {
      "id": "claude",
      "name": "Claude",
      "url": "https://claude.ai",
      "icon": "assets/icons/claude.png",
      "is_default": false
    }
  ],
  "last_active_id": "chatgpt"
}
```

---

### 3. Manifest V3 权限清单 (`manifest.json` 关键配置)

这是项目初始化的骨架，必须严格声明以通过 Chrome 校验。

JSON

```
{
  "manifest_version": 3,
  "name": "AI Side Panel",
  "version": "1.0.0",
  "permissions": [
    "sidePanel",          // 启用侧边栏 API
    "storage",            // 保存用户偏好
    "declarativeNetRequest", // 静态规则
    "declarativeNetRequestWithHostAccess" // 动态主机权限
  ],
  "host_permissions": [
    "*://*.openai.com/*",
    "*://*.chatgpt.com/*",
    "*://*.claude.ai/*",
    "*://gemini.google.com/*",
    "*://*.bing.com/*"   // 需要明确列出主流 AI 域名以应用 DNR 规则
  ],
  "background": {
    "service_worker": "background.js"
  },
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "declarative_net_request": {
    "rule_resources": [
      {
        "id": "ruleset_1",
        "enabled": true,
        "path": "rules.json"
      }
    ]
  }
}
```

---

### 4. 开发与发布路线图 (Dev Roadmap)

待完善

---

### 5. 潜在风险备忘 (Technical Notes)

- **Claude 也是个硬骨头：** 虽然移除了 Header，但 Claude 有时会通过 JS 检测 `window.top`。如果 iframe 方案在 Claude 上失效，架构备选方案是：_仅针对 Claude 使用 `chrome.windows.create` 弹出一个独立小窗口，吸附在侧边_（但 UI 上尽量伪装成一体）。
    
- **扩展性：** 未来用户添加自定义 URL 时，需要动态申请 `host_permissions` 或让用户手动授权，否则 DNR 规则无法生效（无法修改 UA）。MVP 阶段先只做预设列表即可。
    