import MermaidDiagram from './MermaidDiagram';

const ArchitectureDiagram = () => {
  const architectureChart = `
graph TB
    subgraph "🖥️ Frontend Layer"
        UI[📱 React/Next.js Dashboard<br/>User Interface]
        API[🔌 API Routes<br/>REST Endpoints]
        AUTH_UI[🔐 Authentication UI<br/>Login/Register]
    end
    
    subgraph "⚙️ Backend Services"
        direction TB
        AUTH[🛡️ Authentication Service<br/>JWT + Session Management]
        SCRAPER[🕷️ Web Scraper Service<br/>Puppeteer/Playwright]
        PROCESSOR[🔄 File Processor<br/>PDF/Excel Parser]
        SCHEDULER[⏰ Task Scheduler<br/>Cron Jobs + Queue]
        VALIDATOR[✅ Data Validator<br/>Schema Validation]
    end
    
    subgraph "💾 Data Layer"
        DB[(🗄️ PostgreSQL Database<br/>Bills + User Data)]
        REDIS[(⚡ Redis Cache<br/>Session + Temp Data)]
        S3[☁️ File Storage<br/>AWS S3/MinIO)]
        QUEUE[(📋 Message Queue<br/>Bull/BullMQ)]
    end
    
    subgraph "🌐 External Services"
        CDAS[🏢 CDAS Portal<br/>Source System]
        EMAIL[📧 Email Service<br/>SendGrid/Nodemailer]
        SLACK[💬 Slack API<br/>Notifications]
        MONITORING[📊 Monitoring<br/>Sentry/DataDog]
    end
    
    %% Frontend connections
    UI --> API
    UI --> AUTH_UI
    AUTH_UI --> AUTH
    API --> AUTH
    API --> PROCESSOR
    API --> SCHEDULER
    API --> VALIDATOR
    
    %% Backend service connections
    SCRAPER --> CDAS
    SCRAPER --> S3
    SCRAPER --> QUEUE
    PROCESSOR --> DB
    PROCESSOR --> REDIS
    PROCESSOR --> S3
    SCHEDULER --> SCRAPER
    SCHEDULER --> QUEUE
    VALIDATOR --> DB
    AUTH --> DB
    AUTH --> REDIS
    
    %% Notification connections
    PROCESSOR --> EMAIL
    PROCESSOR --> SLACK
    SCHEDULER --> EMAIL
    
    %% Monitoring connections
    SCRAPER -.-> MONITORING
    PROCESSOR -.-> MONITORING
    SCHEDULER -.-> MONITORING
    
    %% Styling
    style UI fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style CDAS fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style DB fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    style S3 fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style REDIS fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    style EMAIL fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style SLACK fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px
    style MONITORING fill:#fff8e1,stroke:#fbc02d,stroke-width:2px
    
    classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backend fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    classDef database fill:#fce4ec,stroke:#ad1457,stroke-width:2px
    classDef external fill:#fff3e0,stroke:#ff8f00,stroke-width:2px
    
    class UI,API,AUTH_UI frontend
    class AUTH,SCRAPER,PROCESSOR,SCHEDULER,VALIDATOR backend
    class DB,REDIS,S3,QUEUE database
    class CDAS,EMAIL,SLACK,MONITORING external
  `;

  return (
    <div className="my-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          System Architecture Overview
        </h3>
        <p className="text-gray-600 text-sm">
          Comprehensive system architecture showing all components and their interactions
        </p>
      </div>
      
      <MermaidDiagram 
        chart={architectureChart} 
        id="architecture-diagram"
        className="mb-6"
        theme="default"
      />
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">🖥️ Frontend Layer</h4>
          <ul className="text-blue-700 space-y-1">
            <li>• React/Next.js Dashboard</li>
            <li>• API Routes</li>
            <li>• Authentication UI</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">⚙️ Backend Services</h4>
          <ul className="text-green-700 space-y-1">
            <li>• Authentication Service</li>
            <li>• Web Scraper</li>
            <li>• File Processor</li>
            <li>• Task Scheduler</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">💾 Data Layer</h4>
          <ul className="text-purple-700 space-y-1">
            <li>• PostgreSQL Database</li>
            <li>• Redis Cache</li>
            <li>• File Storage (S3)</li>
            <li>• Message Queue</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">🌐 External Services</h4>
          <ul className="text-orange-700 space-y-1">
            <li>• CDAS Portal</li>
            <li>• Email Service</li>
            <li>• Slack Integration</li>
            <li>• Monitoring Tools</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">🔄 Data Flow</h4>
        <p className="text-gray-700 text-sm">
          The system follows a microservices architecture where the frontend communicates with backend services through API routes. 
          The web scraper interacts with the CDAS portal to fetch data, which is then processed, validated, and stored in the database. 
          Notifications are sent through email and Slack, while monitoring ensures system health and performance tracking.
        </p>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;