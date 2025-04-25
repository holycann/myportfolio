"use client"

import { motion, AnimatePresence } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

type ImageProps = {
    src: string,
    alt: string,
    width: number,
    height: number,
}

export const AnimatedImageCard = ({
    images,
} : {
    images: ImageProps[];
}) => {
    const [active, setActive] = useState(0);

    const handleActive = useCallback(() => {
        setActive((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const isActive = (index:number) => {
        return index === active;
    }

    const randomRotate = () => {
        return Math.floor(Math.random() * 21) - 10;
    }

    useEffect(() => {
        if (images.length <= 0) return;
        const timer = setInterval(handleActive, 5000);
        return () => clearInterval(timer);
    }, [handleActive, images.length])

    return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
            <div>
                <div className="relative h-80 w-full">
                    <AnimatePresence>
                        {images.map((image, i) => (
                            <motion.div
                            key={image.src}
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                z: -100,
                                rotate: randomRotate(),
                            }}
                            animate={{
                                opacity: isActive(i) ? 1: 0.7,
                                scale: isActive(i) ? 1 : 0.95,
                                z: isActive(i) ? 0 : -100,
                                rotate: isActive(i) ? 0 : randomRotate(),
                                zIndex: isActive(i) ? 40 : images.length + 2 - i,
                                y: isActive(i) ? [0, -80, 0] : 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                z: 100,
                                rotate: randomRotate(),
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                            className='absolute insert-0 origin-bottom'
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={image.width}
                                    height={image.height}
                                    draggable={false}
                                    className="h-full w-full rounded-3xl object-cover object-center"
                                    />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    </div>
    );
}