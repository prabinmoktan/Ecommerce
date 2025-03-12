
type SkeletonVariant = 'text' | 'circle' | 'rect';
interface skeletontypes {
    variant?: SkeletonVariant;
  width?: string;
  height?: string;
  count?: number;
  className?: string;
  animation?: 'pulse' | 'wave';
}

  
export const Skeleton: React.FC<skeletontypes> = ({ variant = 'text', width, height, count = 1, className = '', animation='pulse' }) => {
  // Helper function to determine base classes based on variant
   // Helper function to determine base classes based on variant
   const getBaseClasses = (variant: SkeletonVariant): string => {
    const animationClass = animation === 'pulse' ? 'animate-pulse' : 'animate-shimmer';
    const commonClasses = `${animationClass} bg-gray-200 rounded`;
    
    switch (variant) {
      case 'circle':
        return `${commonClasses} rounded-full`;
      case 'rect':
        return `${commonClasses} rounded-md`;
      case 'text':
      default:
        return `${commonClasses} rounded-md`;
    }
  };

  // Helper function to determine dimensions
  const getDimensions = (variant: SkeletonVariant) => {
    switch (variant) {
      case 'circle':
        return {
          width: width || 'w-12',
          height: height || 'h-12'
        };
      case 'rect':
        return {
          width: width || 'w-full',
          height: height || 'h-24'
        };
      case 'text':
      default:
        return {
          width: width || 'w-full',
          height: height || 'h-4'
        };
    }
  };

  const baseClasses = getBaseClasses(variant);
  const { width: defaultWidth, height: defaultHeight } = getDimensions(variant);

  // Create multiple skeleton items if count > 1
  const skeletons = Array(count).fill(0).map((_, index) => (
    <div
      key={index}
      className={`
        ${baseClasses}
        ${width || defaultWidth}
        ${height || defaultHeight}
        ${className}
        ${index !== count - 1 ? 'mb-2' : ''}
      `}
    />
  ));

  return <>{skeletons}</>;
};

