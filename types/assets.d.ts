// when image/SVG import prevent type error
declare module '*.png'  { const v: string; export default v; }
declare module '*.jpg'  { const v: string; export default v; }
declare module '*.jpeg' { const v: string; export default v; }
declare module '*.gif'  { const v: string; export default v; }
declare module '*.webp' { const v: string; export default v; }
declare module '*.svg'  {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}