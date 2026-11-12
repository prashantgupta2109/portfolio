export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  avatar: string;
  status: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface NavCardItem {
  id: string;
  title: string;
  route: string;
  icon: string;
  description: string;
  badge: string;
  glowColor: "cyan" | "purple" | "emerald" | "amber";
  accentBorder: string;
  accentBg: string;
  accentText: string;
  stats: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  achievements: string[];
  skills: string[];
  organizationLogo?: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  subtitle: string;
  category: "Generative AI" | "TinyML & Edge AI" | "Machine Learning" | "NLP & Analytics";
  period: string;
  image: string;
  screenshots: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  architectureFlow: {
    step: number;
    title: string;
    desc: string;
    icon: string;
  }[];
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  videoUrl?: string;
  featured: boolean;
}

export interface CertificateItem {
  id: string;
  slug: string;
  title: string;
  issuer: string;
  organization: string;
  date: string;
  credentialId?: string;
  image: string;
  category: "Cloud & Data Science" | "Artificial Intelligence" | "Research & Engineering";
  description: string;
  skills: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    logo?: string;
    level?: "Advanced" | "Proficient" | "Intermediate";
    proficiency?: number;
    highlight?: string;
  }[];
}

export const personalInfo: PersonalInfo = {
  name: "Prashant Gupta",
  title: "AI/ML Engineer",
  tagline: "Building practical AI/ML systems across LLMs, machine learning, and Edge AI.",
  bio: "B.Tech final year student at Madan Mohan Malaviya University of Technology with a Minor in Data Science, seeking AI/ML internship and full-time roles. I build LLM/RAG workflows, multi-agent applications, embedded Edge AI wearables, and predictive ML systems.",
  location: "Faridabad, Haryana, India",
  email: "prashant.gupta2109@gmail.com",
  phone: "+91 6306521938",
  github: "https://github.com/prashantgupta2109",
  linkedin: "https://www.linkedin.com/in/prashantgupta2109/",
  avatar: "/images/avatar.jpg",
  status: "Seeking AI/ML internships & full-time roles · On-site, hybrid & remote",
  stats: [
    { label: "Gesture Classification", value: "94%", description: "Edge AI inference accuracy with zero cloud latency on ESP32" },
    { label: "Fault Detection", value: "92%", description: "Model accuracy on 11,000+ IoT sensor telemetry records" },
    { label: "ATS Optimization", value: "85-92%", description: "Skill matching & extraction accuracy across unstructured resumes" },
    { label: "B.Tech & Minor CGPA", value: "8.39 / 9.0", description: "Electrical Engineering + Minor Degree in Data Science" }
  ]
};

export const homeNavCards: NavCardItem[] = [
  {
    id: "experience",
    title: "Experience",
    route: "/experience",
    icon: "Briefcase",
    description: "Founding engineering at OBLIQ-in and embedded AI research at Nano-Intelligence Lab, IIT Roorkee.",
    badge: "2 Roles",
    glowColor: "cyan",
    accentBorder: "hover:border-cyan-500/50",
    accentBg: "from-cyan-500/10 via-cyan-500/5 to-transparent",
    accentText: "text-cyan-400",
    stats: "OBLIQ-in • IIT Roorkee"
  },
  {
    id: "projects",
    title: "Projects",
    route: "/projects",
    icon: "FolderGit2",
    description: "Multi-agent RAG pipelines, TinyML edge wearables, predictive IoT systems, and NLP platforms.",
    badge: "3 Featured Projects",
    glowColor: "purple",
    accentBorder: "hover:border-purple-500/50",
    accentBg: "from-purple-500/10 via-purple-500/5 to-transparent",
    accentText: "text-purple-400",
    stats: "Multi-Agent RAG • TinyML • IoT"
  },
  {
    id: "certificates",
    title: "Certificates",
    route: "/certificates",
    icon: "Award",
    description: "Oracle Cloud Infrastructure 2025 Data Science Professional, AI Foundations & IIT certifications.",
    badge: "3 Certificates",
    glowColor: "emerald",
    accentBorder: "hover:border-emerald-500/50",
    accentBg: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    accentText: "text-emerald-400",
    stats: "Oracle Cloud • IITR • Railway"
  },
  {
    id: "skills",
    title: "Skills",
    route: "/skills",
    icon: "Cpu",
    description: "Deep Learning, LLMs & Agents, LangChain, ESP32 TinyML, FastAPI, Scikit-learn, and Cloud AI.",
    badge: "25+ Tech proficiencies",
    glowColor: "amber",
    accentBorder: "hover:border-amber-500/50",
    accentBg: "from-amber-500/10 via-amber-500/5 to-transparent",
    accentText: "text-amber-400",
    stats: "Python • LangChain • PyTorch • C++"
  }
];

export const experiences: ExperienceItem[] = [
  {
    id: "obliq-in",
    role: "Founding Engineer – 2",
    company: "OBLIQ-in",
    location: "Remote",
    period: "Sept 2026 – Present",
    type: "Founding Team",
    summary: "Building the AI/ML layer for OBLIQ-in, a client document-sharing and audit workspace that connects a firm's private workspace with a restricted client portal.",
    achievements: [
      "Exploring ML-based anomaly detection to complement deterministic risk rules and surface unusual account, amount, timing, and transaction patterns.",
      "Contributing to AI/OCR document intelligence to extract structured information from invoices and audit evidence within a human-in-the-loop workflow.",
      "Supporting the audit document lifecycle, including secure client uploads, review, correction requests, re-uploads, and approvals.",
      "Helping maintain engagement-scoped client access and traceable document versions and review actions."
    ],
    skills: ["Python", "SQL", "Machine Learning"]
  },
  {
    id: "iit-roorkee",
    role: "Research Intern (TinyML & Edge AI)",
    company: "Nano-Intelligence Laboratory, IIT Roorkee",
    location: "Roorkee, India",
    period: "May 2026 – June 2026",
    type: "Research Internship",
    summary: "Spearheaded the design, circuit assembly, and embedded TinyML deployment of an Edge AI smart wearable glove translating physical sign gestures into real-time speech and digital messages with zero cloud dependency.",
    achievements: [
      "Engineered an Edge AI glove architecture utilizing ESP32 microcontroller and 4 custom-calibrated flex sensors to translate 5 complex hand gestures with on-device intelligence.",
      "Curated, preprocessed, and balanced an end-to-end dataset of 1,586 sensor recordings, achieving a verified Signal-to-Noise Ratio (SNR) of 21 with zero missing data.",
      "Optimized a TensorFlow Lite Micro quantized neural network to fit tight RAM constraints on the microcontroller, achieving 94% on-device classification accuracy with sub-20ms inference latency.",
      "Implemented a local standalone WiFi WebServer (192.168.4.1) streaming real-time sensor resistance values and detected gesture alerts to mobile and desktop dashboards."
    ],
    skills: ["TinyML", "ESP32", "TensorFlow Lite Micro", "Sensor Interfacing", "Edge AI", "C++", "Signal Processing", "WiFi Sockets"]
  }
];

export const projects: ProjectItem[] = [
  {
    slug: "ai-business-copilot",
    title: "AI Business Operations Copilot",
    subtitle: "Enterprise 4-Agent Sequential RAG Pipeline & Knowledge Intelligence System",
    category: "Generative AI",
    period: "2026",
    image: "/images/projects/ai-business-copilot-1.png",
    screenshots: [
      "/images/projects/ai-business-copilot-1.png",
      "/images/projects/ai-business-copilot-2.png",
      "/images/projects/ai-business-copilot-3.png"
    ],
    overview: "A production-grade Multi-Agent Retrieval-Augmented Generation (RAG) system built to parse complex corporate documents (HR policies, financial KPIs, and technical SOPs) without cloud dependency or LLM hallucinations.",
    problem: "Traditional corporate document searches take 5-10 minutes per inquiry, while public cloud LLMs risk proprietary data leaks and frequently hallucinate specific internal policy details.",
    solution: "Devised a 4-agent sequential pipeline (Planner -> Researcher -> Executor -> Reviewer) that combines Sentence-Transformers embeddings, L2 distance vector search, and local Llama 3 via Ollama with automated source verification.",
    architecture: [
      "Document Ingestion: Recursive character splitting with semantic metadata preservation",
      "Embedding Generation: all-MiniLM-L6-v2 vector indexing into persistent FAISS vector storage",
      "Agent 1 (Planner): Breaks user queries into sub-tasks and retrieval parameters",
      "Agent 2 (Researcher): Queries vector store with dynamic top-k thresholding & reranking",
      "Agent 3 (Executor): Synthesizes grounded response strictly from retrieved chunks via Llama 3",
      "Agent 4 (Reviewer): Computes hallucination risk & assigns confidence scoring"
    ],
    architectureFlow: [
      { step: 1, title: "Query Ingestion & Planning", desc: "Planner decomposes multi-part query into semantic sub-tasks", icon: "BrainCircuit" },
      { step: 2, title: "FAISS Vector Search", desc: "Researcher retrieves top-k chunks with L2 distance filtering (<45ms)", icon: "Search" },
      { step: 3, title: "Llama 3 Local Synthesis", desc: "Executor synthesizes answer strictly grounded in citations", icon: "Cpu" },
      { step: 4, title: "Reviewer Audit Guardrail", desc: "Verifies 0% hallucination risk & attaches confidence score", icon: "ShieldCheck" }
    ],
    keyFeatures: [
      "Full local inference using Ollama with zero sensitive corporate data leaving the internal network",
      "Real-time per-agent latency tracking and token consumption metrics (182ms total turnaround)",
      "Confidence-weighted citation links directly highlighting verified source documents",
      "6-page interactive Streamlit dashboard paired with high-concurrency FastAPI microservices"
    ],
    metrics: [
      { label: "Hallucination Reduction", value: "99.2%" },
      { label: "Query Retrieval Latency", value: "<180ms" },
      { label: "Document Ingestion Rate", value: "50+ pgs/sec" },
      { label: "Evaluation Score", value: "4.8 / 5.0" }
    ],
    technologies: ["Python", "FastAPI", "Streamlit", "LangChain", "Llama 3", "Ollama", "FAISS", "Sentence-Transformers"],
    githubUrl: "https://github.com/prashantgupta/AI-Business-Operations-Copilot",
    liveDemoUrl: "https://ai-business-operations-copilotgit.streamlit.app/",
    videoUrl: "https://media.githubusercontent.com/media/prashantgupta2109/portfolio/main/public/videos/ai-business-copilot-video.mp4",
    featured: true
  },
  {
    slug: "statementiq",
    title: "STATEMENTIQ",
    subtitle: "Automated Bank Statement Processing & Transaction Reconciliation Platform",
    category: "NLP & Analytics",
    period: "2025 - 2026",
    image: "/images/projects/statementiq-1.png",
    screenshots: [
      "/images/projects/statementiq-1.png",
      "/images/projects/statementiq-2.png",
      "/images/projects/statementiq-3.png"
    ],
    overview: "A robust financial statement parser that extracts transaction ledgers from bank PDFs, cleans unstructured narration strings, and categorizes debit/credit entries automatically into 18 standardized accounting buckets.",
    problem: "Accounting teams spend dozens of hours manually reconciling disparate bank statement formats with varied naming conventions, obscure transaction codes, and error-prone ledger entries.",
    solution: "Built a tabular OCR parsing pipeline combined with custom regex tokenizers and multi-class classification to categorize spending into 18 standardized accounting buckets with automated debit-credit reconciliation.",
    architecture: [
      "OCR Ingestion: PDFPlumber extraction with fallback boundary detection for scanned statements",
      "String Sanitization: Merchant identification & transaction reference ID stripping",
      "Classification: Logistic Regression + TF-IDF with fallback rule-based mapper (95.4% precision)",
      "Export & Sync: Structured JSON and Excel outputs with automated debit-credit reconciliation"
    ],
    architectureFlow: [
      { step: 1, title: "PDF Statement Ingestion", desc: "Multi-page bank PDF uploaded and parsed via OCR table detection", icon: "FileText" },
      { step: 2, title: "Narration Sanitization", desc: "Regex removes UPI/IMPS reference hashes & extracts merchant names", icon: "Sparkles" },
      { step: 3, title: "TF-IDF ML Classifier", desc: "Categorizes transaction into 18 accounting categories with 95.4% accuracy", icon: "BrainCircuit" },
      { step: 4, title: "Ledger Reconciliation", desc: "Verifies double-entry journal balance & generates exportable audit report", icon: "CheckCircle2" }
    ],
    keyFeatures: [
      "Handles multiple Indian and global bank statement layouts (SBI, HDFC, ICICI, etc.) seamlessly",
      "Automated summary analytics showing cash flow trends, burn rate, and expenditure breakdown",
      "Over 95% classification precision on recurring vendor transactions with sub-second parsing",
      "Zero external transmission of sensitive personal financial records ensuring strict compliance"
    ],
    metrics: [
      { label: "Categorization Accuracy", value: "95.4%" },
      { label: "Time Saved", value: "85%" },
      { label: "Supported Formats", value: "10+ Banks" },
      { label: "Privacy Rating", value: "100% Local" }
    ],
    technologies: ["Python", "Pandas", "Scikit-Learn", "RegEx", "PDFPlumber", "Streamlit", "Plotly"],
    githubUrl: "https://github.com/prashantgupta/StatementIQ",
    liveDemoUrl: "https://statementiq.streamlit.app/",
    videoUrl: "https://media.githubusercontent.com/media/prashantgupta2109/portfolio/main/public/videos/statementiq-video.mp4",
    featured: true
  },
  {
    slug: "tinyml-smart-glove",
    title: "Edge AI Smart Glove",
    subtitle: "Real-Time Embedded Gesture Recognition Wearable on ESP32",
    category: "TinyML & Edge AI",
    period: "2026",
    image: "/images/projects/tinyml-smart-glove-1.png",
    screenshots: [
      "/images/projects/tinyml-smart-glove-1.png",
      "/images/projects/tinyml-smart-glove-2.png",
      "/images/projects/tinyml-smart-glove-3.png",
      "/images/projects/tinyml-smart-glove-4.png"
    ],
    overview: "A standalone edge AI wearable glove that captures analog flex resistance, executes an onboard TensorFlow Lite neural network, and translates deaf/mute sign gestures into speech and text wirelessly with zero cloud latency.",
    problem: "Mute and speech-impaired individuals face substantial communication barriers, and existing camera-based solutions suffer from privacy issues, high battery drain, and poor performance in varied lighting.",
    solution: "Designed a light, battery-powered glove with 4 flex sensors wired to an ESP32 ADC. Trained a quantized TinyML model running completely on the micro-controller with zero cloud reliance.",
    architecture: [
      "Hardware: 4 flex sensors + ESP32 dual-core Xtensa micro-controller + 3.7V LiPo battery",
      "Signal Conditioning: Moving average filter + Min-Max normalization (SNR 21)",
      "Model: 3-layer Quantized TFLite Micro Neural Network (INT8)",
      "Communication: Low-latency WebSocket & WiFi broadcast (192.168.4.1) to receiver dashboard"
    ],
    architectureFlow: [
      { step: 1, title: "4 Flex Sensors", desc: "Captures mechanical analog bend resistance across 4 fingers", icon: "Activity" },
      { step: 2, title: "ESP32 ADC & Filter", desc: "Hardware ADC sampling + moving average noise filter (SNR ~21)", icon: "Cpu" },
      { step: 3, title: "TinyML INT8 Model", desc: "On-device quantized neural network classifies gesture in 18ms", icon: "BrainCircuit" },
      { step: 4, title: "WiFi Socket Broadcast", desc: "Standalone AP (192.168.4.1) streams UDP packets to mobile/web UI", icon: "Wifi" }
    ],
    keyFeatures: [
      "Zero internet or cloud server connection required for 100% private on-device inference",
      "1,586 labeled sample dataset gathered and validated across 5 distinct gesture classes",
      "Ultralow power footprint enabling 8+ hours continuous wearable operation on a 3.7V LiPo",
      "Instantaneous conversion to speech with sub-20 millisecond response time"
    ],
    metrics: [
      { label: "Edge Inference Accuracy", value: "94.0%" },
      { label: "Inference Latency", value: "18 ms" },
      { label: "Dataset Samples", value: "1,586" },
      { label: "Model Memory Footprint", value: "24 KB" }
    ],
    technologies: ["C++", "ESP32", "TensorFlow Lite Micro", "TinyML", "Python", "NumPy", "Edge Computing"],
    githubUrl: "https://github.com/prashantgupta/Smart-Glove-TinyML-ESP32",
    liveDemoUrl: "/experience",
    featured: true
  }
];

export const certificates: CertificateItem[] = [
  {
    id: "oracle-data-science",
    slug: "oracle-data-science",
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle University",
    organization: "Oracle",
    date: "Oct 2025",
    credentialId: "102981592OCI25DSOCP",
    image: "/images/certificates/oracle-data-science.jpg",
    category: "Cloud & Data Science",
    description: "Validates enterprise competence in deploying ML workflows, automated machine learning (AutoML), distributed model training, ML pipelines, and model deployment on Oracle Cloud Infrastructure.",
    skills: ["OCI Data Science", "AutoML", "Model Deployment", "Machine Learning Pipelines", "Cloud Architecture", "Python ML"],
  },
  {
    id: "oracle-ai-foundations",
    slug: "oracle-ai-foundations",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    organization: "Oracle",
    date: "Oct 2025",
    credentialId: "102981592OCI25AICFA",
    image: "/images/certificates/oracle-ai-foundations.jpg",
    category: "Artificial Intelligence",
    description: "Demonstrates core foundation in artificial intelligence, deep learning architectures, generative AI concepts, LLM architectures, and OCI Generative AI Service integration.",
    skills: ["Generative AI", "Large Language Models", "OCI AI Services", "Deep Learning", "Ethical AI"],
  },
  {
    id: "iitr-nano-intelligence",
    slug: "iitr-nano-intelligence",
    title: "Nano-Intelligence Lab Research Internship",
    issuer: "IIT Roorkee",
    organization: "Indian Institute of Technology Roorkee",
    date: "Jun 2026",
    credentialId: "NT/AK/2026/0057",
    image: "/images/certificates/iitr-nano-intelligence.jpg",
    category: "Research & Engineering",
    description: "Completed a Nano-Intelligence Lab remote internship at IIT Roorkee focused on microcontrollers for hand gestures.",
    skills: ["Microcontrollers", "Hand Gestures", "Embedded Systems", "Research"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "Code2",
    description: "Programming and query languages.",
    skills: [
      { name: "Python", logo: "python", proficiency: 96 },
      { name: "SQL", logo: "postgresql" },
    ]
  },
  {
    category: "ML & Data Science",
    icon: "BrainCircuit",
    description: "Machine learning, data analysis, and feature development.",
    skills: [
      { name: "Machine Learning", logo: "scikitlearn" },
      { name: "Deep Learning", logo: "tensorflow" },
      { name: "NLP", logo: "huggingface" },
      { name: "EDA", logo: "plotly" },
      { name: "Feature Engineering", logo: "pandas" },
    ]
  },
  {
    category: "Frameworks & Libraries",
    icon: "Blocks",
    description: "Libraries and frameworks used across analytics and AI projects.",
    skills: [
      { name: "Scikit-Learn", logo: "scikitlearn", proficiency: 93 },
      { name: "Pandas", logo: "pandas" },
      { name: "NumPy", logo: "numpy" },
      { name: "Matplotlib", logo: "plotly" },
      { name: "Plotly", logo: "plotly" },
      { name: "LangChain", logo: "langchain", proficiency: 92 },
      { name: "LangGraph", logo: "langchain" },
    ]
  },
  {
    category: "Generative AI",
    icon: "Sparkles",
    description: "Language models, retrieval, and agent-based AI.",
    skills: [
      { name: "LLM" },
      { name: "RAG", logo: "huggingface", proficiency: 95 },
      { name: "Agentic AI", logo: "langchain" },
      { name: "Prompt Engineering" },
      { name: "Fine Tuning", logo: "huggingface" },
      { name: "Vector Database", logo: "qdrant" },
    ]
  },
  {
    category: "Cloud/Database/API",
    icon: "Cloud",
    description: "Application frameworks, databases, and service APIs.",
    skills: [
      { name: "Streamlit", logo: "streamlit", proficiency: 94 },
      { name: "MySQL", logo: "mysql" },
      { name: "Flask", logo: "flask" },
      { name: "REST APIs", logo: "fastapi" },
      { name: "OpenAI API" },
    ]
  },
  {
    category: "Mathematical Foundations",
    icon: "BrainCircuit",
    description: "Mathematical concepts underlying data science and algorithm design.",
    skills: [
      { name: "Statistics", logo: "wolframmathematica" },
      { name: "Linear Algebra", logo: "wolframmathematica" },
      { name: "Probability", logo: "wolframmathematica" },
      { name: "Algorithms", logo: "thealgorithms" },
    ]
  },
  {
    category: "Developer Tools/Version Control",
    icon: "Wrench",
    description: "AI-assisted development and source control tools.",
    skills: [
      { name: "Codex" },
      { name: "Claude Code", logo: "anthropic" },
      { name: "Antigravity", logo: "google" },
      { name: "Cursor", logo: "cursor" },
      { name: "GitHub Copilot", logo: "githubcopilot" },
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
    ]
  }
];

export const coreStrengths = [
  "Python",
  "RAG & Multi-Agent Systems",
  "NLP & Embeddings",
  "Machine Learning (Scikit-Learn)",
  "OCR & Document Intelligence",
  "Edge AI / TinyML",
  "LangChain / LangGraph",
  "Streamlit & FastAPI",
];

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];
