const tools = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    category: "AI Tools",
    pricing: "Freemium",
    rating: "4.8",
    bestFor: "Writing, research, planning, coding help",
    description: "A flexible AI assistant for writing, brainstorming, research, learning, and productivity.",
    longDescription: "ChatGPT is a flexible all-purpose AI assistant that helps with writing, brainstorming, planning, summaries, coding, and idea generation. It is useful for students, freelancers, creators, and developers who need fast thinking support.",
    pros: ["Very flexible for many tasks", "Beginner-friendly interface", "Strong writing and brainstorming support"],
    cons: ["Can still make mistakes", "Best features may require paid plans"],
    initials: "CG",
    link: "#"
  },
  {
    slug: "canva",
    name: "Canva",
    category: "Creators",
    pricing: "Freemium",
    rating: "4.6",
    bestFor: "Design, thumbnails, social media posts",
    description: "Beginner-friendly design platform for creators, students, and small businesses.",
    longDescription: "Canva helps create graphics, presentations, thumbnails, and social posts quickly. It is especially useful when you need fast, polished visuals without opening a design PhD program in your brain.",
    pros: ["Extremely beginner-friendly", "Large template library", "Good for thumbnails and quick designs"],
    cons: ["Advanced features may need paid plan", "Heavy customization is limited compared to pro tools"],
    initials: "CV",
    link: "#"
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    category: "Students",
    pricing: "Freemium",
    rating: "4.4",
    bestFor: "Notes, documents, task organization",
    description: "Useful for organizing research, notes, projects, and writing workflows.",
    longDescription: "Notion AI is useful for notes, study organization, project planning, and lightweight writing assistance. It works best when you already like Notion’s workspace style.",
    pros: ["Great for organizing knowledge", "Works well with documents and notes", "Good for students and planners"],
    cons: ["Can feel slower on weak devices", "Best value depends on using the Notion ecosystem"],
    initials: "NA",
    link: "#"
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    category: "Writing",
    pricing: "Freemium",
    rating: "4.5",
    bestFor: "Grammar, tone, English writing",
    description: "Writing assistant for better grammar, clarity, and professional communication.",
    longDescription: "Grammarly helps improve grammar, clarity, and tone, especially for emails, documents, and client communication. A solid tool if your English needs a bodyguard.",
    pros: ["Fast grammar correction", "Good tone guidance", "Useful for professional writing"],
    cons: ["Can over-correct style", "Premium is needed for deeper suggestions"],
    initials: "GR",
    link: "#"
  },
  {
    slug: "capcut",
    name: "CapCut",
    category: "Creators",
    pricing: "Freemium",
    rating: "4.5",
    bestFor: "Short videos, captions, editing",
    description: "Fast video editor for short-form content, captions, and social posts.",
    longDescription: "CapCut is a fast editor for short videos, auto captions, clips, and social content. It is especially useful for creators who need speed more than cinematic ego.",
    pros: ["Easy short-form editing", "Auto-captions are helpful", "Beginner-friendly"],
    cons: ["Some pro features may be restricted", "Desktop workflow is simpler than high-end editors"],
    initials: "CC",
    link: "#"
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    category: "Coding",
    pricing: "Paid",
    rating: "4.3",
    bestFor: "Coding, autocomplete, debugging",
    description: "AI coding assistant for developers who want faster code suggestions.",
    longDescription: "GitHub Copilot suggests code, speeds up repetitive work, and can help developers move faster. Great when used intelligently. Terrible if treated like a substitute for thinking.",
    pros: ["Speeds up repetitive coding", "Useful autocomplete", "Helpful for boilerplate and examples"],
    cons: ["May suggest flawed code", "Paid tool"],
    initials: "GC",
    link: "#"
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    category: "AI Tools",
    pricing: "Freemium",
    rating: "4.5",
    bestFor: "Research and quick answers",
    description: "AI-powered answer engine that is useful for research and source discovery.",
    longDescription: "Perplexity is useful for fast research, answer summaries, and finding source links quickly. It shines when you want faster search with citations.",
    pros: ["Good for quick research", "Source-focused answers", "Simple interface"],
    cons: ["May oversimplify complex topics", "Still requires verification"],
    initials: "PX",
    link: "#"
  },
  {
    slug: "remove-bg",
    name: "Remove.bg",
    category: "Creators",
    pricing: "Freemium",
    rating: "4.2",
    bestFor: "Background removal",
    description: "Simple tool for removing image backgrounds quickly.",
    longDescription: "Remove.bg quickly removes photo backgrounds and is useful for product mockups, thumbnails, and profile photos.",
    pros: ["Fast and easy", "Great for quick creator tasks"],
    cons: ["Limited free use", "Not ideal for complex edge cases"],
    initials: "RB",
    link: "#"
  },
  {
    slug: "trello",
    name: "Trello",
    category: "Business",
    pricing: "Freemium",
    rating: "4.2",
    bestFor: "Task boards and project tracking",
    description: "Visual project management boards for individuals and small teams.",
    longDescription: "Trello uses boards and cards to help organize tasks and workflows. Great for simple collaboration and keeping chaos in a cage.",
    pros: ["Simple visual boards", "Good for teams and solo tracking"],
    cons: ["Can get messy at scale", "Less powerful than advanced PM tools"],
    initials: "TR",
    link: "#"
  },
  {
    slug: "google-gemini",
    name: "Google Gemini",
    category: "AI Tools",
    pricing: "Freemium",
    rating: "4.2",
    bestFor: "AI assistance and Google workflows",
    description: "AI assistant connected to Google's ecosystem and productivity workflows.",
    longDescription: "Google Gemini is useful if you already work in Google’s ecosystem and want AI assistance across search, docs, and productivity tasks.",
    pros: ["Fits Google ecosystem", "Useful for everyday assistant tasks"],
    cons: ["Quality varies by task", "Best value depends on your workflow"],
    initials: "GM",
    link: "#"
  },
  {
    slug: "figma",
    name: "Figma",
    category: "Design",
    pricing: "Freemium",
    rating: "4.7",
    bestFor: "UI design and prototyping",
    description: "Professional design tool for websites, apps, mockups, and prototypes.",
    longDescription: "Figma is a strong design tool for websites, apps, and prototyping. Ideal when you want collaborative UI work without emailing fifteen files like it is 2007.",
    pros: ["Excellent for interface design", "Great collaboration", "Strong prototype workflow"],
    cons: ["Learning curve for beginners", "Can feel heavy on weak machines"],
    initials: "FG",
    link: "#"
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "Business",
    pricing: "Freemium",
    rating: "4.4",
    bestFor: "Automation",
    description: "Connects apps and automates repetitive workflows without heavy coding.",
    longDescription: "Zapier helps automate workflows between apps and saves time on repetitive tasks. If manual work is the disease, automation is the rude but effective doctor.",
    pros: ["Great no-code automation", "Connects many apps"],
    cons: ["Advanced usage can get expensive", "Complex automations take time to learn"],
    initials: "ZP",
    link: "#"
  }
];

const guides = [
  {
    slug: "best-ai-tools-for-students",
    title: "Best AI tools for students: the practical starter list",
    tag: "Students",
    description: "A beginner-friendly guide to studying faster, organizing notes, improving writing, and avoiding lazy AI mistakes.",
    intro: "Students need tools that save time without destroying real learning. This guide focuses on practical tools that help with studying, note-taking, writing, and organization.",
    sections: [
      { heading: "1. Use AI for structure, not cheating", body: "Use tools to summarize notes, explain hard concepts, and generate study plans. Do not outsource your brain entirely unless your life goal is becoming a confused parrot." },
      { heading: "2. Best starter stack", body: "A simple stack could include ChatGPT for explanations, Notion AI for notes, and Grammarly for polishing writing." },
      { heading: "3. Avoid common mistakes", body: "Always verify information, write in your own words, and use AI as a helper rather than a ghost student." }
    ]
  },
  {
    slug: "start-freelancing-with-no-experience",
    title: "How to start freelancing with no experience",
    tag: "Freelancing",
    description: "Build a simple portfolio, write better proposals, find first clients, and use AI without looking fake.",
    intro: "Freelancing does not begin with confidence. It begins with a profile, a simple offer, and enough stubbornness to keep sending proposals.",
    sections: [
      { heading: "1. Start with one clear offer", body: "Choose one service such as simple websites, thumbnail design, captioning, or CV formatting." },
      { heading: "2. Build proof fast", body: "Create 2–3 sample works even if nobody paid you yet. Evidence beats potential." },
      { heading: "3. Use AI carefully", body: "AI can help draft proposals and organize ideas, but your pitch must still sound human and specific." }
    ]
  },
  {
    slug: "ai-tools-for-video-creators",
    title: "AI tools for video creators and short-form editors",
    tag: "Creators",
    description: "Tools for scripting, captions, thumbnails, editing, repurposing, and publishing faster.",
    intro: "Video creators need speed. The goal is not to worship software. The goal is to get more good content published with less pain.",
    sections: [
      { heading: "1. Script and idea tools", body: "Use ChatGPT or Gemini for titles, concepts, and shot lists." },
      { heading: "2. Editing and captions", body: "CapCut is strong for quick edits and caption workflows. Canva helps with thumbnails and simple visuals." },
      { heading: "3. Workflow rule", body: "Faster is good. Faster ugly is still ugly. Quality matters." }
    ]
  },
  {
    slug: "build-cv-and-portfolio-with-ai",
    title: "How to build a CV and portfolio with AI",
    tag: "Career",
    description: "A step-by-step workflow to create a cleaner CV, better profile, and proof-of-work portfolio.",
    intro: "A good CV gets attention. A portfolio gets belief. Together, they stop you from looking theoretical.",
    sections: [
      { heading: "1. Start with clarity", body: "State what you do, who you help, and which result you create." },
      { heading: "2. Use AI for polish", body: "AI can help rewrite bullets, improve phrasing, and tighten structure." },
      { heading: "3. Show proof", body: "Screenshots, links, and before/after examples are stronger than adjectives." }
    ]
  },
  {
    slug: "best-free-ai-tools-for-small-business",
    title: "Best free AI tools for small business owners",
    tag: "Business",
    description: "Save time on content, support, documents, marketing ideas, and basic operations.",
    intro: "Small businesses do not need every shiny AI toy. They need tools that save time, reduce cost, and remove boring work.",
    sections: [
      { heading: "1. Start with the pain point", body: "Choose tools based on writing, support, design, or task organization—not hype." },
      { heading: "2. Cheap stack", body: "A simple stack might include ChatGPT, Canva, Trello, and Zapier." },
      { heading: "3. Review monthly", body: "Cancel tools you do not use. Software subscriptions multiply faster than rabbits." }
    ]
  },
  {
    slug: "online-work-scams-red-flags",
    title: "Online work scams: red flags beginners must know",
    tag: "Safety",
    description: "If someone promises easy money, your wallet is probably the business model. Learn the warning signs.",
    intro: "Online work is real. So are online scams. Beginners get hurt most when greed outruns skepticism.",
    sections: [
      { heading: "1. Upfront payment red flag", body: "If someone asks you to pay to get work, stop and inspect the trap." },
      { heading: "2. Impossible income claims", body: "Guaranteed income, secret methods, and magic systems are scam perfume." },
      { heading: "3. Protect yourself", body: "Use trusted platforms, verify people, and never rush because of fake urgency." }
    ]
  }
];
