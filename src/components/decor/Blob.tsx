interface BlobProps {
  color: string;
  className?: string;
  variant?: 1 | 2 | 3;
}

const PATHS = {
  1: 'M421.5,316Q400,382,332,419Q264,456,189,420Q114,384,77,312Q40,240,82,170Q124,100,200,72Q276,44,346,86Q416,128,438,204Q460,280,421.5,316Z',
  2: 'M438,303Q406,366,344,403Q282,440,210,419Q138,398,93,335Q48,272,82,200Q116,128,188,93Q260,58,331,93Q402,128,438,204Q474,240,438,303Z',
  3: 'M413,308Q386,376,318,415Q250,454,178,418Q106,382,75,309Q44,236,86,166Q128,96,206,73Q284,50,355,86Q426,122,440,201Q454,280,413,308Z',
};

const Blob = ({ color, className = '', variant = 1 }: BlobProps) => (
  <svg
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={`pointer-events-none absolute ${className}`}
  >
    <path d={PATHS[variant]} fill={color} />
  </svg>
);

export default Blob;
