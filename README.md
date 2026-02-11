# AI Side Panel

<div align="center">

**零配置 AI 侧边栏 - 快速访问多个 AI 工具**

[中文文档](#中文说明) | [English Documentation](#english-documentation)

</div>

---

## 中文说明

### 简介

AI Side Panel 是一款 Chrome 浏览器扩展，让你在侧边栏中快速访问 ChatGPT、Claude、Gemini、DeepSeek、豆包等多个 AI 工具。

**核心特性：**
- 🚀 **零配置** - 安装即用，无需登录
- ⚡ **瞬间切换** - iframe 缓存机制，切换工具时保持页面状态
- 🎯 **多 AI 支持** - 预置 5 个主流 AI 工具
- ✏️ **自定义管理** - 支持添加、编辑、删除、排序自定义工具
- 📋 **支持复制** - iframe 内可以复制粘贴内容

### 预置 AI 工具

| 工具 | 地址 |
|------|------|
| ChatGPT | https://chatgpt.com/ |
| Claude | https://claude.ai/chats |
| Gemini | https://gemini.google.com/ |
| DeepSeek | https://chat.deepseek.com/ |
| 豆包 | https://www.doubao.com/chat/ |

### 安装方式

#### 从 Chrome 网上应用店安装（推荐）
1. 访问 [Chrome Web Store](https://chrome.google.com/webstore)
2. 搜索 "AI Side Panel"
3. 点击 "添加到 Chrome"

#### 开发者模式安装
1. 下载本扩展的源代码
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 启用右上角的 "开发者模式"
4. 点击 "加载已解压的扩展程序"
5. 选择扩展所在的文件夹

### 使用说明

1. **打开侧边栏**：点击浏览器工具栏中的扩展图标
2. **切换工具**：点击侧边栏左侧的 AI 工具图标
3. **添加自定义工具**：点击下方的 "+" 按钮，输入名称和 URL
4. **管理工具**：在管理弹窗中可以编辑、删除或拖拽排序工具

### 技术实现

- **架构**：Chrome Extension Manifest V3
- **核心技术**：
  - Side Panel API：实现侧边栏集成
  - Declarative Net Request (DNR)：修改 User-Agent 和移除 Frame 限制
  - iframe 缓存：使用 Map 结构缓存所有 iframe 实例
  - Storage API：持久化用户配置

### 授权声明

扩展图标来源于 [Flaticon](https://www.flaticon.com)，遵循免费使用授权协议。
```
Source: Filling cabinet icons created by HideMaru - Flaticon
Link: https://www.flaticon.com/free-icons/filling-cabinet
```

### 隐私说明

本扩展严格遵守用户隐私保护原则，承诺如下：

**数据收集：**
- 本扩展 **不收集** 任何用户个人数据、浏览历史、输入内容或任何其他信息

**数据存储：**
- 用户配置（AI工具列表、排序等）仅存储在本地 Chrome Storage 中
- 数据仅保存在用户的设备上，不会被上传到任何服务器

**数据传输：**
- 本扩展 **不传输** 任何数据到第三方服务器
- iframe 直接加载目标 AI 网站，内容直接由目标网站提供

**数据共享：**
- 本扩展 **不与任何第三方** 共享任何用户数据
- 不出售、出租或以任何形式转让用户数据

**数据删除：**
- 用户可以随时卸载本扩展，所有本地存储的配置数据将被完全删除

**更新日期：** 2026年2月

### 开源协议

MIT License

---

## English Documentation

### Introduction

AI Side Panel is a Chrome browser extension that allows you to quickly access multiple AI tools including ChatGPT, Claude, Gemini, DeepSeek, and Doubao in a side panel.

**Key Features:**
- 🚀 **Zero Configuration** - Ready to use immediately after installation
- ⚡ **Instant Switching** - iframe caching preserves page state when switching between tools
- 🎯 **Multiple AI Support** - Pre-configured with 5 popular AI tools
- ✏️ **Custom Management** - Add, edit, delete, and reorder custom tools
- 📋 **Copy Support** - Copy and paste content within iframes

### Pre-configured AI Tools

| Tool | URL |
|------|-----|
| ChatGPT | https://chatgpt.com/ |
| Claude | https://claude.ai/chats |
| Gemini | https://gemini.google.com/ |
| DeepSeek | https://chat.deepseek.com/ |
| 豆包 (Doubao) | https://www.doubao.com/chat/ |

### Installation

#### Install from Chrome Web Store (Recommended)
1. Visit [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "AI Side Panel"
3. Click "Add to Chrome"

#### Install in Developer Mode
1. Download the extension source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the extension folder

### Usage Guide

1. **Open Side Panel**: Click the extension icon in the browser toolbar
2. **Switch Tools**: Click on AI tool icons in the left sidebar
3. **Add Custom Tool**: Click the "+" button at the bottom, enter name and URL
4. **Manage Tools**: In the management modal, you can edit, delete, or drag to reorder tools

### Technical Implementation

- **Architecture**: Chrome Extension Manifest V3
- **Core Technologies**:
  - Side Panel API: Side panel integration
  - Declarative Net Request (DNR): Modify User-Agent and remove frame restrictions
  - iframe Caching: Map structure to cache all iframe instances
  - Storage API: Persist user configuration

### License Attribution

Extension icons are sourced from [Flaticon](https://www.flaticon.com) under free-to-use licensing.
```
Source: Filling cabinet icons created by HideMaru - Flaticon
Link: https://www.flaticon.com/free-icons/filling-cabinet
```

### Privacy Policy

This extension strictly adheres to user privacy protection principles, with the following commitments:

**Data Collection:**
- This extension does **not collect** any user personal data, browsing history, input content, or any other information

**Data Storage:**
- User configurations (AI tool list, ordering, etc.) are stored only locally in Chrome Storage
- Data is stored solely on the user's device and is never uploaded to any server

**Data Transmission:**
- This extension does **not transmit** any data to third-party servers
- iframes load target AI websites directly, with content provided directly by the target websites

**Data Sharing:**
- This extension does **not share** any user data with any third parties
- We do not sell, rent, or otherwise transfer user data in any form

**Data Deletion:**
- Users can uninstall this extension at any time, and all locally stored configuration data will be completely deleted

**Last Updated:** February 2026

### Open Source License

MIT License
