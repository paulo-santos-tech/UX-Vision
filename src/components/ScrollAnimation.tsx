import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;