# Chrome Extension Permission Error Fix

## Issue
Error: "Only permissions specified in the manifest may be requested"

## Root Cause
Chrome Extensions **cannot dynamically request arbitrary domains**. All domains must be pre-declared in the manifest's `host_permissions` or `optional_host_permissions` array.

## Current State Analysis

Your manifest.json (latest version) SHOULD have optional_host_permissions configured. If you're seeing the error, try these solutions:

## Solution 1: Move All Domains to host_permissions (RECOMMENDED)

This is the simplest approach. Remove `optional_host_permissions` and the dynamic permission request code.

### Step 1: Update manifest.json

Replace:
```json
"optional_host_permissions": [
  "*://qwen.ai/*",
  "*://*.wenxiaobai.com/*",
  ...
]
```

With moving these domains to `host_permissions`:
```json
"host_permissions": [
  "*://*.openai.com/*",
  "*://*.chatgpt.com/*",
  "*://*.claude.ai/*",
  "*://gemini.google.com/*",
  "*://chat.deepseek.com/*",
  "*://www.doubao.com/*",
  "*://chat.z.ai/*",
  "*://qwen.ai/*",
  "*://*.wenxiaobai.com/*",
  "*://*.anthropic.com/*",
  "*://*.ai.com/*",
  "*://qwenlm.ai/*",
  "*://*.poe.com/*",
  "*://*.perplexity.ai/*",
  "*://*.character.ai/*",
  "*://*.cohere.com/*",
  "*://*.huggingface.co/*",
  "*://*.bard.ai/*",
  "*://*.minimax.chat/*",
  "*://x.ai/*",
  "*://*.groq.com/*",
  "*://*.mistral.ai/*",
  "*://*.replicate.com/*",
  "*://*.api.openai.com/*",
  "*://*.chatglm.cn/*",
  "*://*.xinghuo.xfyun.cn/*"
]
```

### Step 2: Update rules.json with core domains only

```json
"condition": {
  "requestDomains": [
    "openai.com",
    "chatgpt.com",
    "claude.ai",
    "google.com",
    "deepseek.com",
    "doubao.com",
    "z.ai",
    "qwen.ai",
    "wenxiaobai.com"
  ]
}
```

### Step 3: Simplify sidepanel.js remove permission request

**Find and modify the addTool function:**

Remove or simplify this check:
```javascript
// Remove this block - not needed anymore since all domains are pre-declared
const domain = extractDomain(url);
if (domain) {
  const hasPermission = await chrome.permissions.contains({
    origins: [`*://${domain}/*`]
  });
  // ... rest of permission logic
}
```

Change to:
```javascript
async function addTool() {
  console.log('=== addTool called ===');

  if (!toolNameInput || !toolUrlInput) {
    console.error('DOM elements not found');
    alert('错误：无法找到输入框');
    return;
  }

  const name = toolNameInput.value.trim();
  const url = toolUrlInput.value.trim();

  if (!name || !url) {
    alert('请输入完整的名称和URL');
    return;
  }

  try {
    new URL(url);
  } catch (e) {
    alert('请输入有效的URL');
    return;
  }

  const domain = extractDomain(url);
  console.log('Extracted domain:', domain);

  const newTool = {
    id: 'tool_' + Date.now(),
    name,
    url,
    icon: getFaviconUrl(url)
  };

  console.log('Adding tool:', newTool);
  aiTools.push(newTool);

  try {
    await saveTools();
    console.log('Tools saved');
    createIframes([newTool]);
    console.log('Iframe created');
    renderToolsList();
    console.log('Tools list rendered');
    renderNav(aiTools);
    console.log('Nav rendered');
    await refreshDnrRules();
    console.log('DNR rules refreshed');

    toolNameInput.value = '';
    toolUrlInput.value = '';
    console.log('Input fields cleared');

    toolNameInput.focus();
    console.log('Focused on name input');

    console.log('Tool added successfully. Total tools:', aiTools.length);
  } catch (error) {
    console.error('Error during addTool:', error);
    alert('添加工具时发生错误: ' + error.message);
  }
}
```

**Remove these functions completely:**
- `requestPermissionForDomain()`

## Solution 2: Keep optional_host_permissions (Alternative)

If you MUST use dynamic permissions, ensure:

1. The domain is EXACTLY in optional_host_permissions
2. No permission check before request (chrome.permissions.request handles this)

```javascript
async function requestPermissionForDomain(domain) {
  if (!domain) return false;

  try {
    // Don't check first, just request - Chrome will handle if already granted
    return await chrome.permissions.request({
      origins: [`*://${domain}/*`]
    });
  } catch (error) {
    console.error('Permission request failed:', error);
    alert(`无法获取 ${domain} 的权限。\n\n请确保该域名在 optional_host_permissions 中已声明。`);
    return false;
  }
}
```

## Important Reminders

### Reinstall the Extension
Manifest changes require:
1. Go to `chrome://extensions/`
2. Click "Remove" on AI Side Panel
3. Click "Load unpacked" and select the folder again

### Why This Happens
Chrome Extensions have a **hard security restriction**: you cannot request arbitrary domains at runtime. All domains must be pre-declared so users understand what the extension can access.

This is by design - otherwise extensions could gradually request more and more permissions without users knowing.

### Adding New Domains
When adding support for a new AI tool, you MUST:
1. Add the domain to `host_permissions` in manifest.json
2. Add the domain to `requestDomains` in rules.json (for iframe embedding)
3. Reinstall the extension

There is NO true "dynamic" domain addition in Chrome Extensions - this is a fundamental limitation.

## Test After Fix

1. Reinstall extension
2. Try adding: https://qwen.ai/home
3. Try adding: https://www.wenxiaobai.com/
4. Both should work without permission errors

## Files Modified

- manifest.json: Move domains to host_permissions
- rules.json: Add core domains to requestDomains
- sidepanel.js: Simplify addTool, remove unnecessary permission checks
