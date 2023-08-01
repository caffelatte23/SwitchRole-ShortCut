export const getActiveTab = async () => {
  if (chrome?.tabs) {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  }
  return null;
};

class Storage {
  key = '';

  constructor(key: string) {
    this.key = key;
  }

  async get(): Promise<unknown> {
    const result = await chrome.storage.sync.get(this.key);
    return result[this.key] ?? null;
  }

  async set(value: unknown): Promise<void> {
    const props = Object();
    props[this.key] = value;

    return await chrome.storage.sync.set(props);
  }
}

export const storage = new Storage('switchRole-shortcut');
