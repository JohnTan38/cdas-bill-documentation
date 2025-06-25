import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

// Import your custom Mermaid components
import MermaidDiagram from './src/components/MermaidDiagram';
import WorkflowDiagram from './src/components/WorkflowDiagram';
import ArchitectureDiagram from './src/components/ArchitectureDiagram';

// Custom components for better MDX experience
const CustomImage = (props: any) => {
  return (
    <div className="my-6 flex justify-center">
      <Image
        {...props}
        className="rounded-lg shadow-lg border border-gray-200"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

const CustomLink = (props: any) => {
  const isExternal = props.href?.startsWith('http');
  
  if (isExternal) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors"
      />
    );
  }
  
  return (
    <Link {...props} className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors" />
  );
};

const CustomCode = (props: any) => {
  return (
    <code
      {...props}
      className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border"
    />
  );
};

const CustomPre = (props: any) => {
  return (
    <pre
      {...props}
      className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border shadow-sm"
    />
  );
};

const CustomBlockquote = (props: any) => {
  return (
    <blockquote
      {...props}
      className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic"
    />
  );
};

const CustomTable = (props: any) => {
  return (
    <div className="overflow-x-auto my-6">
      <table {...props} className="min-w-full border-collapse border border-gray-300" />
    </div>
  );
};

const CustomTh = (props: any) => {
  return (
    <th
      {...props}
      className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold text-gray-800"
    />
  );
};

const CustomTd = (props: any) => {
  return (
    <td
      {...props}
      className="border border-gray-300 px-4 py-2 text-gray-700"
    />
  );
};

// Heading components with better styling
const CustomH1 = (props: any) => {
  return (
    <h1
      {...props}
      className="text-4xl font-bold text-gray-900 mt-8 mb-6 pb-2 border-b border-gray-200"
    />
  );
};

const CustomH2 = (props: any) => {
  return (
    <h2
      {...props}
      className="text-3xl font-semibold text-gray-800 mt-8 mb-4"
    />
  );
};

const CustomH3 = (props: any) => {
  return (
    <h3
      {...props}
      className="text-2xl font-semibold text-gray-800 mt-6 mb-3"
    />
  );
};

const CustomH4 = (props: any) => {
  return (
    <h4
      {...props}
      className="text-xl font-semibold text-gray-800 mt-6 mb-3"
    />
  );
};

const CustomP = (props: any) => {
  return (
    <p
      {...props}
      className="text-gray-700 leading-7 mb-4"
    />
  );
};

const CustomUl = (props: any) => {
  return (
    <ul
      {...props}
      className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4"
    />
  );
};

const CustomOl = (props: any) => {
  return (
    <ol
      {...props}
      className="list-decimal list-inside text-gray-700 space-y-2 mb-4 ml-4"
    />
  );
};

const CustomLi = (props: any) => {
  return (
    <li
      {...props}
      className="text-gray-700"
    />
  );
};

// Alert/Callout component
const Alert = ({ type = 'info', children, ...props }: { type?: 'info' | 'warning' | 'error' | 'success', children: React.ReactNode }) => {
  const baseClasses = "p-4 rounded-lg border-l-4 my-4";
  const typeClasses = {
    info: "bg-blue-50 border-blue-500 text-blue-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
    error: "bg-red-50 border-red-500 text-red-800",
    success: "bg-green-50 border-green-500 text-green-800"
  };
  
  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} {...props}>
      {children}
    </div>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom Mermaid components
    MermaidDiagram,
    WorkflowDiagram,
    ArchitectureDiagram,
    
    // Enhanced default components
    img: CustomImage,
    Image: CustomImage,
    a: CustomLink,
    Link: CustomLink,
    code: CustomCode,
    pre: CustomPre,
    blockquote: CustomBlockquote,
    table: CustomTable,
    th: CustomTh,
    td: CustomTd,
    
    // Enhanced headings
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
    h4: CustomH4,
    
    // Enhanced text elements
    p: CustomP,
    ul: CustomUl,
    ol: CustomOl,
    li: CustomLi,
    
    // Custom components
    Alert,
    
    // Spread any additional components passed in
    ...components,
  };
}