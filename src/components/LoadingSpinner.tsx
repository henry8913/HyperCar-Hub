import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white';
}

const LoadingSpinner = ({ size = 'medium', color = 'primary' }: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  const colorMap = {
    primary: 'border-amber-500',
    white: 'border-white',
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div 
        className={`${sizeMap[size]} border-4 border-slate-300/30 rounded-full ${colorMap[color]} border-t-transparent`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;