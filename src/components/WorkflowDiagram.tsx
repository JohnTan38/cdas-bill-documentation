import MermaidDiagram from './MermaidDiagram';

const WorkflowDiagram = () => {
  const workflowChart = `
flowchart TD
    A[🔐 CDAS Portal Login] --> B[📋 Navigate to Bills Section]
    B --> C[📅 Select Date Range]
    C --> D[⬇️ Download Bills/Invoices]
    D --> E[🔄 Process Downloaded Files]
    E --> F[✅ Validate Data]
    F --> G[💾 Store in Database]
    G --> H[📊 Generate Reports]
    H --> I[📧 Send Notifications]
    
    subgraph "🤖 Automation Layer"
        direction TB
        J[⏰ Scheduler] --> K[🕷️ Web Scraper]
        K --> L[📁 File Processor]
        L --> M[🔍 Data Validator]
        M --> N[🗄️ Database Manager]
        N --> O[📈 Report Generator]
        O --> P[🔔 Notification Service]
    end
    
    subgraph "🛡️ Security & Monitoring"
        direction TB
        Q[🔒 Authentication]
        R[📋 Audit Logs]
        S[⚠️ Error Handling]
        T[📊 Performance Metrics]
    end
    
    A -.-> J
    B -.-> K
    C -.-> K
    D -.-> L
    E -.-> M
    F -.-> N
    G -.-> O
    H -.-> P
    
    J --> Q
    K --> R
    L --> S
    M --> T
    
    style A fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style I fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    style J fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style P fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style Q fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    classDef automationBox fill:#fff8e1,stroke:#ff8f00,stroke-width:2px
    classDef securityBox fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class J,K,L,M,N,O,P automationBox
    class Q,R,S,T securityBox
  `;

  return (
    <div className="my-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Automated Workflow Process
        </h3>
        <p className="text-gray-600 text-sm">
          Complete automation pipeline from CDAS portal to notification delivery
        </p>
      </div>
      
      <MermaidDiagram 
        chart={workflowChart} 
        id="workflow-diagram"
        className="mb-6"
        theme="default"
      />
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">🔄 Manual Process</h4>
          <p className="text-blue-700">User-initiated actions and configuration steps</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">🤖 Automation Layer</h4>
          <p className="text-orange-700">Scheduled background processes and data handling</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">🛡️ Security & Monitoring</h4>
          <p className="text-green-700">Authentication, logging, and performance tracking</p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagram;