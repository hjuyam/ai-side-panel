const DEFAULT_AI_TOOLS = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com/"
  },
  {
    id: "claude",
    name: "Claude",
    url: "https://claude.ai/chats"
  },
  {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com/"
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    url: "https://chat.deepseek.com/"
  },
  {
    id: "doubao",
    name: "豆包",
    url: "https://www.doubao.com/chat/"
  }
];

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    await chrome.storage.local.set({
      ai_tools: DEFAULT_AI_TOOLS,
      last_active_id: 'chatgpt'
    });
    console.log('AI Side Panel initialized with default AI tools');
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.sidePanel.open({ tabId: tab.id });
});

chrome.runtime.onStartup.addListener(async () => {
  console.log('AI Side Panel service worker started');
});
