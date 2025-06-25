'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
  className?: string;
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
}

const MermaidDiagram = ({ 
  chart, 
  id = 'mermaid-diagram', 
  className = '',
  theme = 'default'
}: MermaidDiagramProps) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamically import mermaid to avoid SSR issues
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: theme,
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
            padding: 20,
            nodeSpacing: 50,
            rankSpacing: 50
          },
          sequence: {
            diagramMarginX: 50,
            diagramMarginY: 20,
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
            useMaxWidth: true,
            wrap: true
          },
          gantt: {
            useMaxWidth: true,
            leftPadding: 75,
            rightPadding: 20
          },
          journey: {
            useMaxWidth: true
          }
        });

        if (mermaidRef.current) {
          // Clear previous content
          mermaidRef.current.innerHTML = '';
          
          // Generate unique ID for each render
          const diagramId = `${id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          const { svg } = await mermaid.render(diagramId, chart.trim());
          mermaidRef.current.innerHTML = svg;
          
          // Add responsive behavior
          const svgElement = mermaidRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
          }
        }
        
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error rendering Mermaid diagram:', error);
        setError(error.message || 'Unknown error occurred');
        setIsLoading(false);
        
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `
            <div class="error-message p-4 border border-red-300 rounded-lg bg-red-50 text-red-700">
              <p class="font-semibold">Error rendering diagram</p>
              <details class="mt-2">
                <summary class="cursor-pointer text-sm hover:text-red-900">Show details</summary>
                <pre class="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">${error.message}</pre>
              </details>
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [chart, id, theme]);

  return (
    <div className={`mermaid-container my-6 ${className}`}>
      <div 
        ref={mermaidRef} 
        className="mermaid-diagram min-h-[200px] flex items-center justify-center bg-white border border-gray-200 rounded-lg p-6 overflow-x-auto shadow-sm"
      >
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span>Loading diagram...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MermaidDiagram;