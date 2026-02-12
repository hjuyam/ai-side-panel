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

> 💡 如果您觉得这个项目不错，请先给我们点个 **⭐ Star** 支持一下！

#### 方法一：手动安装（推荐）

按照以下步骤，即可轻松安装到您的 Chrome 浏览器：

**第 1 步：下载代码**  
点击页面右上角的绿色 **"<> Code"** 按钮，选择 **"Download ZIP"**，将压缩包下载到电脑。

**第 2 步：解压文件**  
找到下载好的 ZIP 压缩包，双击解压（Windows 右键选择"全部解压缩"，Mac 双击即可）。解压后会得到一个文件夹。

**第 3 步：打开 Chrome 扩展页面**  
在 Chrome 浏览器地址栏输入：
```
chrome://extensions/
```
然后按回车键进入扩展管理页面。

**第 4 步：开启开发者模式**  
在扩展页面右上角，找到 **"开发者模式"** 开关，点击开启（按钮会变成蓝色）。

**第 5 步：加载插件**  
点击左上角的 **"加载已解压的扩展程序"** 按钮，在弹出的窗口中，选择刚才解压得到的文件夹，点击"选择文件夹"。

**第 6 步：开始使用**  
安装成功后，您会在扩展列表中看到 "AI Side Panel"，浏览器工具栏也会出现插件图标。点击图标即可打开侧边栏，开始使用 AI 工具！

---

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

### 添加新 AI 工具支持

由于 Chrome 扩展的安全限制，所有 AI 网站的域名需要在 manifest 中预声明。如需添加新 AI 工具，需要修改：

**1. manifest.json**：在 `host_permissions` 添加域名
**2. rules.json**：在 `requestDomains` 数组添加对应域名

修改后需重新加载扩展才能生效。

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

> 💡 If you find this project helpful, please give us a **⭐ Star** first!

#### Method 1: Manual Installation (Recommended)

Follow these simple steps to install the extension in your Chrome browser:

**Step 1: Download the Code**  
Click the green **"<> Code"** button at the top right of the page, select **"Download ZIP"**, and save the ZIP file to your computer.

**Step 2: Extract the Files**  
Find the downloaded ZIP file and extract it (Windows: right-click → "Extract All", Mac: double-click). You'll get a folder after extraction.

**Step 3: Open Chrome Extensions Page**  
Type the following in your Chrome address bar:
```
chrome://extensions/
```
Press Enter to go to the Extensions management page.

**Step 4: Enable Developer Mode**  
In the top right corner of the extensions page, find the **"Developer mode"** toggle and turn it on (the button will turn blue).

**Step 5: Load the Extension**  
Click the **"Load unpacked"** button in the top left. In the popup window, select the folder you just extracted, then click "Select Folder".

**Step 6: Start Using**  
Once installed successfully, you'll see "AI Side Panel" in the extensions list, and the extension icon will appear in your browser toolbar. Click the icon to open the side panel and start using AI tools!

---

#### Method 2: Install from Release (Optional)

1. Visit the [Releases page](../../releases)
2. Download the latest `.zip` file
3. Extract it and follow Steps 3-6 from Method 1

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

### Adding New AI Tools

Due to Chrome's security restrictions, all AI tool domains must be pre-declared. To add support for new tools, update:

**1. manifest.json**: Add domains to `host_permissions`
**2. rules.json**: Add domains to `requestDomains` array

Reload the extension after making changes.

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
