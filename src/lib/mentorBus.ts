// Lightweight global event bus for opening the AI Mentor chat with context.
type ChatContext = { topic: string; prompt: string };

const EVT = "mentor:open-chat";

export const openMentorChat = (ctx: ChatContext) => {
  window.dispatchEvent(new CustomEvent<ChatContext>(EVT, { detail: ctx }));
};

export const onMentorChatOpen = (handler: (ctx: ChatContext) => void) => {
  const fn = (e: Event) => handler((e as CustomEvent<ChatContext>).detail);
  window.addEventListener(EVT, fn);
  return () => window.removeEventListener(EVT, fn);
};
