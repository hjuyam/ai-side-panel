/*
 * Extension icons licensed under free-to-use guidelines
 * Source: <a href="https://www.flaticon.com/free-icons/filling-cabinet" title="filling cabinet icons">Filling cabinet icons created by HideMaru - Flaticon</a>
 */

const nav = document.querySelector('.ai-nav');
const iframeContainer = document.getElementById('iframe-container');
const loadingIndicator = document.getElementById('loading-indicator');
const addBtn = document.getElementById('add-btn');
const managerModal = document.getElementById('manager-modal');
const closeModalBtn = document.getElementById('close-modal');
const addToolBtn = document.getElementById('add-tool-btn');
const toolNameInput = document.getElementById('tool-name');
const toolUrlInput = document.getElementById('tool-url');
const toolsList = document.getElementById('tools-list');

let currentToolId = null;
let aiTools = [];
const iframeMap = new Map();

function getFaviconUrl(url) {
  try {
    const urlObj = new URL(url);
    const baseUrl = urlObj.origin;
    return `https://www.google.com/s2/favicons?domain=${baseUrl}&sz=64`;
  } catch (e) {
    return '';
  }
}

async function init() {
  try {
    const data = await chrome.storage.local.get({
      ai_tools: [],
      last_active_id: null
    });

    aiTools = data.ai_tools;

    if (aiTools.length === 0) {
      aiTools = await loadDefaultTools();
    }

    console.log('Init - aiTools:', aiTools, 'last_active_id:', data.last_active_id);

    createIframes(aiTools);
    renderNav(aiTools);
    await ensureIcons(aiTools);

    let targetUrl = aiTools[0]?.url || 'https://chatgpt.com/';
    let targetId = aiTools[0]?.id || 'chatgpt';

    const activeTool = aiTools.find(tool => tool.id === data.last_active_id);
    if (activeTool) {
      targetUrl = activeTool.url;
      targetId = activeTool.id;
    }

    loadTool(targetUrl, targetId);
  } catch (error) {
    console.error('Init error:', error);
    loadTool('https://chatgpt.com/', 'chatgpt');
  }
}

async function loadDefaultTools() {
  const defaultTools = [
    { id: "chatgpt", name: "ChatGPT", url: "https://chatgpt.com/" },
    { id: "claude", name: "Claude", url: "https://claude.ai/chats" },
    { id: "gemini", name: "Gemini", url: "https://gemini.google.com/" },
    { id: "deepseek", name: "DeepSeek", url: "https://chat.deepseek.com/" },
    { id: "doubao", name: "豆包", url: "https://www.doubao.com/chat/" }
  ];

  const toolsWithIcons = await ensureIcons(defaultTools);
  await chrome.storage.local.set({ ai_tools: toolsWithIcons, last_active_id: 'chatgpt' });
  return toolsWithIcons;
}

async function ensureIcons(tools) {
  return tools.map(tool => {
    if (!tool.icon) {
      tool.icon = getFaviconUrl(tool.url);
    }
    return tool;
  });
}

function createIframes(tools) {
  tools.forEach(tool => {
    if (!iframeMap.has(tool.id)) {
      const iframe = document.createElement('iframe');
      iframe.className = 'tool-iframe';
      iframe.id = `iframe-${tool.id}`;
      iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads';
      iframe.allow = 'clipboard-write';
      iframe.loading = 'lazy';
      iframe.setAttribute('referrerpolicy', 'no-referrer');
      iframeContainer.appendChild(iframe);
      iframeMap.set(tool.id, iframe);
    }
  });
}

function loadIframe(url, id) {
  const iframe = iframeMap.get(id);
  if (iframe && !iframe.src) {
    iframe.src = url;
  }
}


function renderNav(aiToolsList) {
  const existingTools = Array.from(nav.querySelectorAll('.ai-button')).filter(btn => !btn.classList.contains('add-button'));
  existingTools.forEach(btn => btn.remove());

  aiToolsList.forEach((tool, index) => {
    const button = document.createElement('button');
    button.className = 'ai-button';
    button.dataset.id = tool.id;
    button.dataset.url = tool.url;
    button.dataset.index = index;
    button.draggable = true;
    button.title = '拖动调整顺序';

    const img = document.createElement('img');
    img.className = 'ai-icon';
    img.src = tool.icon || getFaviconUrl(tool.url);
    img.alt = tool.name;
    img.draggable = false;

    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = tool.name;

    button.appendChild(img);
    button.appendChild(tooltip);
    nav.insertBefore(button, addBtn);

    button.addEventListener('click', () => {
      if (!button.classList.contains('dragging')) {
        loadTool(tool.url, tool.id);
      }
    });

    setupNavDragDrop(button);
  });
}

function loadTool(url, id) {
  if (currentToolId === id) return;

  const prevIframe = currentToolId ? iframeMap.get(currentToolId) : null;
  const newIframe = iframeMap.get(id);

  if (prevIframe) {
    prevIframe.classList.remove('active');
  }

  if (newIframe) {
    const isFirstLoad = !newIframe.src;

    if (isFirstLoad) {
      loadingIndicator.classList.remove('hidden');
    }

    if (isFirstLoad) {
      newIframe.src = url;

      const timer = setTimeout(() => {
        loadingIndicator.classList.add('hidden');
      }, 8000);

      newIframe.addEventListener('load', () => {
        clearTimeout(timer);
        loadingIndicator.classList.add('hidden');
      }, { once: true });

      newIframe.addEventListener('error', () => {
        clearTimeout(timer);
        loadingIndicator.classList.add('hidden');
      }, { once: true });
    }

    newIframe.classList.add('active');
    currentToolId = id;

    document.querySelectorAll('.ai-button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.id === id);
    });

    chrome.storage.local.set({ last_active_id: id });
  } else {
    console.error('iframe not found for id:', id);
  }
}


function openManagerModal() {
  toolsList.innerHTML = '';
  renderToolsList();
  managerModal.classList.remove('hidden');
}

function closeManagerModal() {
  managerModal.classList.add('hidden');
}

function renderToolsList() {
  toolsList.innerHTML = '';

  aiTools.forEach((tool, index) => {
    const li = document.createElement('li');
    li.className = 'tool-item';
    li.draggable = true;
    li.dataset.index = index;
    li.dataset.id = tool.id;

    const favicon = document.createElement('img');
    favicon.src = tool.icon || getFaviconUrl(tool.url);
    favicon.alt = tool.name;

    const info = document.createElement('div');
    info.className = 'tool-info';

    const name = document.createElement('div');
    name.className = 'tool-name';
    name.textContent = tool.name;

    const url = document.createElement('div');
    url.className = 'tool-url';
    url.textContent = tool.url;

    info.appendChild(name);
    info.appendChild(url);

    const dragHandle = document.createElement('span');
    dragHandle.className = 'drag-handle';
    dragHandle.textContent = '⋮⋮';

    const actions = document.createElement('div');
    actions.className = 'tool-actions';

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✎';
    editBtn.title = '编辑';
    editBtn.onclick = () => editTool(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '×';
    deleteBtn.title = '删除';
    deleteBtn.onclick = () => deleteTool(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(dragHandle);
    li.appendChild(favicon);
    li.appendChild(info);
    li.appendChild(actions);

    setupDragAndDrop(li);

    toolsList.appendChild(li);
  });
}

function setupNavDragDrop(button) {
  button.addEventListener('dragstart', (e) => {
    button.classList.add('dragging');
    e.dataTransfer.setData('text/plain', button.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
  });

  button.addEventListener('dragend', () => {
    button.classList.remove('dragging');
    updateNavOrder();
  });

  button.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.ai-button.dragging');
    if (!dragging || dragging === button) return;

    const siblings = [...nav.querySelectorAll('.ai-button:not(.add-button):not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
      const rect = sibling.getBoundingClientRect();
      return e.clientY < rect.top + rect.height / 2;
    });

    nav.insertBefore(dragging, nextSibling || addBtn);
  });
}

function updateNavOrder() {
  const buttons = [...nav.querySelectorAll('.ai-button:not(.add-button)')];
  const newOrder = buttons.map(btn => {
    const toolId = btn.dataset.id;
    return aiTools.find(tool => tool.id === toolId);
  }).filter(Boolean);

  aiTools = newOrder;
  saveTools();
}

function setupDragAndDrop(item) {
  item.addEventListener('dragstart', (e) => {
    item.classList.add('dragging');
    e.dataTransfer.setData('text/plain', item.dataset.id);
  });

  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
    updateToolsOrder();
  });

  item.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const siblings = [...toolsList.querySelectorAll('.tool-item:not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
      const rect = sibling.getBoundingClientRect();
      return e.clientY < rect.top + rect.height / 2;
    });
    toolsList.insertBefore(dragging, nextSibling);
  });
}

function updateToolsOrder() {
  const items = [...toolsList.querySelectorAll('.tool-item')];
  const newOrder = items.map(item => {
    const toolId = item.dataset.id;
    return aiTools.find(tool => tool.id === toolId);
  }).filter(Boolean);
  aiTools = newOrder;
  saveTools();
  renderNav(aiTools);
}


async function addTool() {
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

  const newTool = {
    id: 'tool_' + Date.now(),
    name,
    url,
    icon: getFaviconUrl(url)
  };

  aiTools.push(newTool);
  await saveTools();
  createIframes(aiTools);
  renderToolsList();
  renderNav(aiTools);

  toolNameInput.value = '';
  toolUrlInput.value = '';
}

async function editTool(index) {
  const tool = aiTools[index];
  const newName = prompt('修改名称:', tool.name);
  if (newName === null) return;

  const newUrl = prompt('修改URL:', tool.url);
  if (newUrl === null) return;

  if (newName.trim() && newUrl.trim()) {
    try {
      new URL(newUrl.trim());
      aiTools[index].name = newName.trim();
      aiTools[index].url = newUrl.trim();
      aiTools[index].icon = getFaviconUrl(newUrl.trim());
      await saveTools();
      renderToolsList();
      renderNav(aiTools);
    } catch (e) {
      alert('请输入有效的URL');
    }
  }
}

async function deleteTool(index) {
  if (confirm('确定要删除这个工具吗？')) {
    const deletedTool = aiTools[index];

    aiTools.splice(index, 1);
    await saveTools();
    renderToolsList();
    renderNav(aiTools);

    const iframe = iframeMap.get(deletedTool.id);
    if (iframe) {
      iframe.remove();
      iframeMap.delete(deletedTool.id);
    }

    if (currentToolId === deletedTool.id) {
      if (aiTools.length > 0) {
        loadTool(aiTools[0].url, aiTools[0].id);
      }
    }
  }
}


async function saveTools() {
  await chrome.storage.local.set({ ai_tools: aiTools });
}

addBtn.addEventListener('click', openManagerModal);
closeModalBtn.addEventListener('click', closeManagerModal);
managerModal.addEventListener('click', (e) => {
  if (e.target === managerModal) {
    closeManagerModal();
  }
});
addToolBtn.addEventListener('click', addTool);

document.addEventListener('DOMContentLoaded', init);

